<script setup>
const routerTo = (to) => {
    window.open(to, "_blank");
}
</script>

<template>
    <!-- placeholder vertical -->
    <div class="" style="height: 10vh;"></div>
    <!-- body content -->
    <div class="container d-flex flex-wrap justify-content-center">

        <div class="card mb-5 me-5" style="max-width: 460px;" @click="routerTo('/projects/aiduo-chat')">
            <div class="row g-0">
                <div class="col-md-4">
                    <img src="https://dummyimage.com/400x500/ddd/aaa" class="img-fluid object-fit-cover " alt="爱多聊Ai">
                </div>
                <div class="col-md-8 d-flex flex-column">
                    <div class="card-body">
                        <h5 class="card-title">爱多聊Ai</h5>
                        <p class="card-text">使用Maui blazor hybrid 技术方案实现的一款多平台Ai聊天应用，支持
                            window\android 平台。
                        </p>
                    </div>
                    <div class="card-footer text-muted">
                        <span class=" float-end">QQ群：580430770</span>
                    </div>
                </div>
            </div>
        </div>

        <div class="card mb-5 me-5" style="max-width: 460px;">
            <div class="row g-0">
                <div class="col-md-4">
                    <img src="https://dummyimage.com/400x500/ddd/aaa" class="img-fluid object-fit-cover" alt="爱跟读">
                </div>
                <div class="col-md-8">
                    <div class="card-body">
                        <h5 class="card-title">爱跟读</h5>
                        <p class="card-text">使用Maui blazor hybrid 技术方案实现的一款移动端跟读学习应用. 包含自制电子音频文档，
                            多角色朗读，跟读模式，跟读打分等功能。</p>
                    </div>
                </div>
            </div>
        </div>

    </div>
    <!-- placeholder vertical -->
    <div class="" style="height: 10vh;"></div>
    <div class="container d-flex flex-column justify-content-center col-md-6 col-sm-12">
        <div class="card">
            <div class="card-header">
                
            </div>
            <div class="card-body">
                <blockquote class="blockquote mb-0">
                    <p>体力不行，但精神可嘉. 🤭</p>
                    <footer class="blockquote-footer float-end">爱多玩 <cite title="Source Title">
                        <a role="button" class="" href="https://space.bilibili.com/229818759?spm_id_from=333.1007.0.0" target="_blank">Bilibili</a></cite>
                    </footer>
                </blockquote>
            </div>
        </div>

        <div class="card mt-4">
            <div class="card-header">
                
            </div>
            <div class="card-body">
                <blockquote class="blockquote mb-0">
                    <p>电量不足恐惧症，加大电压吧. 🤭</p>
                    <footer class="blockquote-footer float-end">疯狂的兔子 <cite title="Source Title">
                        <a role="button" class="" href="https://afdian.net/a/aoaobaba" target="_blank">爱发电</a>
                        </cite>
                    </footer>
                </blockquote>
            </div>
        </div>
    </div>
    <!-- placeholder vertical -->
    <div class="" style="height: 50vh;"></div>
</template>
