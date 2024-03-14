---
title: Maui Blazor hybrid 混合开发项目问题汇总
date: 2024-03-04
update: 2024-03-04
top: false
tags: test
---
<route lang="yaml">
meta:
  layout: article
</route>

<Mdtitle :title="frontmatter.title" :update="frontmatter.update" />

### 应用版本问题

#### 官方说明

以下引用自github中， Xamarin官方的md文档。[原文链接](https://github.com/xamarin/xamarin-android/blob/main/Documentation/guides/OneDotNetSingleProject.md)

# One .NET "Single Project"

One theme for Xamarin in .NET 6 is to simplify the cross-platform
experience between iOS and Android. We would like to provide
cross-platform alternatives to `AndroidManifest.xml` and `Info.plist`.
The eventual goal would be to remove the need for these files for
simple apps and project templates. Developers would only need to
create them when a less widely used feature is needed. We would need
to create item templates for `AndroidManifest.xml` and `Info.plist`
when (and if) they are removed from project templates.

The concepts for a Xamarin "single project" go much beyond this. This
document is a starting point for what needs to go in the .NET Android
and Apple SDKs, while much of the remaining features would be in the
Xamarin.Forms/MAUI MSBuild targets.

For starters, we can add the following MSBuild properties to the
Xamarin.Android and Xamarin.iOS/Mac SDKs:

* `$(ApplicationId)` maps to `/manifest/@package` and
  `CFBundleIdentifier`
* `$(ApplicationVersion)` maps to `android:versionCode` or
  . This is required to be an integer on Android and
  less than 10000 on iOS. This value must be incremented for each
  Google Play or App Store / TestFlight submission.
* `$(ApplicationDisplayVersion)` maps to `android:versionName` or
  . This can
  default to `$(ApplicationVersion)` when blank.
* `$(ApplicationTitle)` maps to `/application/@android:title` or
  `CFBundleDisplayName`

The final value that is generated in the `Info.plist` or
`AndroidManifest.xml` can be overridden at different times. The final
source of truth is determined in order of:

1. `Info.plist` or `AndroidManifest.xml` in the iOS/Android project.
2. iOS/Android `.csproj` defines the MSBuild properties. This could
   also be done in a .NET MAUI "Single Project".
3. The properties set by MSBuild via other means such as
   `Directory.Build.props`, etc.

Even if we did not complete the goal of complete removal of
`AndroidManifest.xml` and `Info.plist` from Xamarin project templates,
these new MSBuild properties would be useful in their own right.

## Opting out

.NET Core introduced `$(GenerateAssemblyInfo)` which defaults to `true`.
Projects migrating to .NET Core might set this to `false` if they have
an existing `Properties/AssemblyInfo.cs`. We should have a similar
property to disable the behavior.

`$(GenerateApplicationManifest)` defaults to `true` in .NET 6 and
`false` in "legacy" Xamarin.Android/Xamarin.iOS.

In most cases, developers would only use `$(GenerateApplicationManifest)`
if they want to try the new features in "legacy" Xamarin.

## Version, AssemblyVersion, FileVersion, and InformationalVersion

Since we are adding *more* version properties, we should consider
adding defaults to consolidate the assembly-level attributes when
using `$(GenerateAssemblyInfo)`.

The full list of defaults might be something like:

```xml
<PropertyGroup>
  <ApplicationVersion Condition=" '$(ApplicationVersion)' == '' ">1</ApplicationVersion>
  <Version Condition=" '$(ApplicationDisplayVersion)' != '' ">$(ApplicationDisplayVersion)</Version>
  <ApplicationDisplayVersion Condition=" '$(ApplicationDisplayVersion)' == '' ">$(Version)</ApplicationDisplayVersion>
</PropertyGroup>
```

The dotnet/sdk defaults `$(Version)` to 1.0.0 and uses it to set:

* `$(AssemblyVersion)`
* `$(FileVersion)`
* `$(InformationalVersion)`

If we expect users to set `$(ApplicationVersion)` and
`$(ApplicationDisplayVersion)` in mobile apps, we can use the value of
`$(ApplicationDisplayVersion)` for `$(Version)` as well.

## Android Template

The default Android project template would include:

```xml
<!-- .csproj -->
<Project Sdk="Microsoft.NET.Sdk">
  <PropertyGroup>
    <TargetFramework>net6.0-android</TargetFramework>
    <ApplicationTitle>@string/application_title</ApplicationTitle>
    <ApplicationId>com.companyname.myapp</ApplicationId>
    <ApplicationVersion>1</ApplicationVersion>
    <ApplicationDisplayVersion>1.0</ApplicationDisplayVersion>
  </PropertyGroup>
</Project>

<!-- Resources/values/strings.xml -->
<resources>
    <string name="application_title">MyApp</string>
</resources>
```

Removed from `AndroidManifest.xml` in the project template:

* `/manifest/@android:versionCode="1"`
* `/manifest/@android:versionName="1.0"`
* `/manifest/@package="com.companyname.myapp"`
* `/application/@android:label="MyApp"`

All values could be added later to the `AndroidManifest.xml` and
override the MSBuild properties.

## iOS Template

The default iOS project template would include:

```xml
<Project Sdk="Microsoft.NET.Sdk">
  <PropertyGroup>
    <TargetFramework>net6.0-ios</TargetFramework>
    <ApplicationTitle>MyApp</ApplicationTitle>
    <ApplicationId>com.companyname.myapp</ApplicationId>
    <ApplicationVersion>1</ApplicationVersion>
    <ApplicationDisplayVersion>1.0</ApplicationDisplayVersion>
  </PropertyGroup>
</Project>
```

Removed from `Info.plist` in the project template:

* `CFBundleDisplayName`
* `CFBundleIdentifier`
* `CFBundleVersion`
* `CFBundleShortVersionString`

All values could be added later to the `Info.plist` and override the
MSBuild properties.

## Example

The .NET MAUI project template (`dotnet new maui`):

* `HelloMaui/HelloMaui.csproj` - multi-targeted for `net6.0-android`,
  `net6.0-ios`, `net6.0-maccatalyst`, etc.

Where the versions can be setup for both platforms at once with:

```xml
<Project>
  <PropertyGroup>
    <ApplicationTitle>Hello!</ApplicationTitle>
    <ApplicationId>com.companyname.hello</ApplicationId>
    <ApplicationVersion>1</ApplicationVersion>
    <ApplicationDisplayVersion>1.0</ApplicationDisplayVersion>
  </PropertyGroup>
</Project>
```

In this project, a developer would increment `$(ApplicationVersion)`
and `$(ApplicationDisplayVersion)` for each public release.

## Localization

`$(ApplicationTitle)` can easily be localized on Android by using an
**AndroidResource** as the value.

However, on iOS you would need to specify
 in the `Info.plist` and provide
`CFBundleName` or `CFBundleDisplayName` in a `.strings` file for each
supported language. For our first implementation, you would omit
`$(ApplicationTitle)` from the `.csproj` file if you need to localize
it.

One can imagine supporting a `.resx` key via a new
`$(LocalizedApplicationTitle)` property. This would likely need to be
implemented in Xamarin.Forms/MAUI MSBuild tasks as a way to provide a
single `.resx` file to be translated to the appropriate format for iOS
and Android. This is a consideration for the future.

## Other Future Work

In future iterations, we can consider additional MSBuild properties
beyond `$(ApplicationTitle)`, `$(ApplicationId)`,
`$(ApplicationVersion)`, and `$(ApplicationDisplayVersion)`.

This is a list of additional properties that cover most of the
property pages in Visual Studio:

* `$(AndroidMinSdkVersion)`
* `$(AndroidTargetSdkVersion)`
* `$(AndroidInstallLocation)`
* `$(iOSMinimumOSVersion)`, `$(tvOSMinimumOSVersion)`,
  `$(MacMinimumOSVersion)`, and potentially other variants for
  Catalyst, etc.
* `$(AppleLaunchScreen)`
* `$(AppleDeviceFamily)` - `iPhone`, `iPad`, `Universal`, `TV`, and
  potentially other variants for Catalyst, etc.
* `$(AppleMainStoryboard)`
* `$(ApplicationIcon)`
* `$(ApplicationRoundIcon)` or `$(AndroidRoundIcon)`

Some settings would make more sense as an item group:

* `@(iOSSupportedInterfaceOrientations)` _iOS only_ - an item group
  that needs to support `UISupportedInterfaceOrientations` and
  `UISupportedInterfaceOrientations~ipad`
* `@(ApplicationPermission)` - an item group that maps to common
  permissions, similar to some behavior in Xamarin.Essentials.

To completely remove `AndroidManifest.xml` we would need to somehow
provide (or emit by default):

* `/android/@android:allowBackup="true"`
* `/android/@android:supportsRtl="true"`

To completely remove `Info.plist` we would need to somehow
provide (or emit by default):

* `LSRequiresIPhoneOS`
* `UIRequiredDeviceCapabilities` for `armv7`

#### 简单总结一下

 之于Maui 多平台应用（包括使用maui blazor hybrid 混合多平台）：

* 不同目标平台可单独设置构建应用的版本
* 优先级：目标平台配置 > .csproj 配置(MSBuild)
* ApplicationDisplayVersion 为空时会取ApplicationVersion 的值
* ApplicationVersion 值会被映射至ios/android 相关的版本属性
* 都没有配置，则默认1.0
* 可以使用条件Condition配置控制版本信息

之于自己的项目，非必要分目标应用管理版本的话，可统一使用 .csproj 的配置：

```
<!-- Versions -->
<ApplicationDisplayVersion>1.0.0</ApplicationDisplayVersion>
<ApplicationVersion>1</ApplicationVersion>
```

注意！如果你在window 上进行开发，可能需要手动移出window  目标平台的版本配置项目，Platforms -> windows ->Package.appxmanifest

文件内：

```
<!--Version="0.0.4.0"  需要从此项目内移出Version 配置-->
<Identity Name="maui-package-name-placeholder" Publisher="CN=aoaoms.com" />
```

#### Maui获取应用版本信息

可以使用IAppInfo 接口在应用内部获取当前应用的相关信息：

* [Name](https://learn.microsoft.com/zh-cn/dotnet/api/microsoft.maui.applicationmodel.iappinfo.name#microsoft-maui-applicationmodel-iappinfo-name) — 应用名称。
* [PackageName](https://learn.microsoft.com/zh-cn/dotnet/api/microsoft.maui.applicationmodel.iappinfo.packagename#microsoft-maui-applicationmodel-iappinfo-packagename) — 包名称或应用标识符，例如 `com.microsoft.myapp`。
* [VersionString](https://learn.microsoft.com/zh-cn/dotnet/api/microsoft.maui.applicationmodel.iappinfo.versionstring#microsoft-maui-applicationmodel-iappinfo-versionstring) — 应用版本，例如 `1.0.0`。
* [Version](https://learn.microsoft.com/zh-cn/dotnet/api/microsoft.maui.applicationmodel.iappinfo.version#microsoft-maui-applicationmodel-iappinfo-version) — 应用版本，作为 [Version](https://learn.microsoft.com/zh-cn/dotnet/api/system.version) 对象。
* [BuildString](https://learn.microsoft.com/zh-cn/dotnet/api/microsoft.maui.applicationmodel.iappinfo.buildstring#microsoft-maui-applicationmodel-iappinfo-buildstring) — 版本的内部版本号，例如 `1000`。
* [RequestedTheme](https://learn.microsoft.com/zh-cn/dotnet/api/microsoft.maui.applicationmodel.iappinfo.requestedtheme#microsoft-maui-applicationmodel-iappinfo-requestedtheme) — 检测到的系统或应用主题。
* [PackagingModel](https://learn.microsoft.com/zh-cn/dotnet/api/microsoft.maui.applicationmodel.iappinfo.packagingmodel#microsoft-maui-applicationmodel-iappinfo-packagingmodel) — 应用的打包模型。
* [RequestedLayoutDirection](https://learn.microsoft.com/zh-cn/dotnet/api/microsoft.maui.applicationmodel.iappinfo.requestedlayoutdirection#microsoft-maui-applicationmodel-iappinfo-requestedlayoutdirection) — 系统或应用请求的布局方向。

e.g. -  AppInfo.Current.VersionString

### 构建与发布应用

#### Android应用发布

切记！如果发布到android设备，需要构建apk文件，按照[官方操作](https://learn.microsoft.com/zh-cn/dotnet/maui/android/deployment/?view=net-maui-8.0) 可以连接到android模拟器或者Usb链接到真机进行构建包；接着，存储密匙并签名，然后再分发创建apk。 拷贝apk到设备，允许安装未知来源的应用 授权安装即可。如果遇到，分析包错误的提示，尝试关闭Usb调试模式后再尝试！
