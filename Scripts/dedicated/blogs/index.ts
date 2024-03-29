﻿// @ts-nocheck
//skip ts strict check cz 'vue js'
import { shareIt } from '../../global.js'
declare const VueRouter: any, axios: any;
declare const Vue: any;

const routerViewElement = document.querySelector('router-view');
const CategorisedBlogComponent = {
    props: ['param1', 'param2'],
    watch: {
        $route(to: { params: { param1: any; param2: any; }; }, from: { params: { param1: any; param2: any; }; }) {
            if (to.params.param1 !== from.params.param1 || to.params.param2 !== from.params.param2) {
                if (routerViewElement) {
                    routerViewElement.innerHTML = this.blogs;
                }

                this.$nextTick(() => {
                    this.isLoading = true;
                    this.titleItem = 'Blogs \'' + this.param2 + '\'',
                        this.loadDefault();
                    window.scrollTo({
                        top: 0,
                        behavior: 'smooth',
                    });
                });
            }
        }
    },
    mounted() {

        this.loadDefault("", "");
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    },
    methods: {
        async loadDefault() {
            try {
                const response = await axios.get('/api/blogs/0/' + this.param1 + '/' + this.param2);
                const data = response.data;
                this.blogs = data;
            } catch (error) {
                console.error('Error fetching data from API:', error);
            } finally {
                this.isLoading = false;
                ;
            }
        },
    },
    data() {
        return {
            blogs: [],
            isLoading: true,
            titleItem: 'Blogs \'' + this.param2 + '\'',
        };
    },
    template: `
        <h1 class="pb-3 pb-lg-4" id="titleBlog">{{titleItem}}</h1>
        <div v-if="isLoading">
            <article class="row g-0 border-0 mb-4">
                <a class="col-sm-5 rounded-5 placeholder placeholder-wave" style="min-height:14rem"></a>
                <div class="col-sm-7">
                    <div class="pt-4 pb-sm-4 ps-sm-4 pe-lg-4">
                        <p class="card-text placeholder-glow">
                            <span class="placeholder placeholder-sm col-7 me-2"></span>
                            <span class="placeholder placeholder-sm col-4"></span>
                            <span class="placeholder placeholder-sm col-4 me-2"></span>
                            <span class="placeholder placeholder-sm col-6"></span>
                            <span class="placeholder placeholder-sm col-8"></span>
                        </p>
                    </div>
                </div>
            </article>
        </div>
        <div v-else>
            <div v-for="blog in blogs" :key="blog.title">
                <article class="row g-0 border-0 mb-4 fade-in">
                    <a class="col-sm-5 bg-repeat-0 bg-size-cover bg-position-center rounded-5" v-bind:href="'/blog/' + blog.datePosted.substring(0,4) + '/' + blog.urlHandle " v-bind:style="{ 'background-image': 'url(https://res.cloudinary.com/dkpmezpui/image/upload/v1707656187/almondcoveassets/blogs/' + blog.datePosted.substring(0, 4) + '/' + blog.urlHandle + '/cover.webp)', 'min-height': '14rem' }"></a>
                    <div class="col-sm-7">
                        <div class="pt-4 pb-sm-4 ps-sm-4 pe-lg-4">
                            <h3>
                                <a v-bind:href="'/blog/' + blog.datePosted.substring(0, 4)+'/' + blog.urlHandle">
                                    {{blog.title}}
                                </a>
                            </h3>
                            <p class="d-sm-none d-md-block">{{blog.description}}</p><div class="d-flex flex-wrap align-items-center mt-n2"><a class="nav-link text-muted fs-sm fw-normal d-flex align-items-end p-0 mt-2" href="#">{{blog.comments}}<i class="ai-message fs-lg ms-1"></i></a><span class="fs-xs opacity-20 mt-2 mx-3">|</span><span class="fs-sm text-muted mt-2">{{blog.datePosted.substring(0, 7)}}</span><span class="fs-xs opacity-20 mt-2 mx-3">|</span><router-link class="badge text-nav fs-xs border mt-2" :to="'/blogs/category/'+  blog.locator ">{{blog.category}}</router-link></div>
                        </div>
                    </div>
                </article>
            </div>
        </div>
                            `,
};
const HomeComponent = {
    template: `
            <h1 class="pb-3 pb-lg-4" id="titleBlog">{{titleItem}}</h1>
            <div v-if="isLoading">
                <article class="row g-0 border-0 mb-4">
                    <a class="col-sm-5 rounded-5 placeholder placeholder-wave" style="min-height:14rem"></a>
                    <div class="col-sm-7">
                        <div class="pt-4 pb-sm-4 ps-sm-4 pe-lg-4">
                            <p class="card-text placeholder-glow"><span class="placeholder placeholder-sm col-7 me-2"></span><span class="placeholder placeholder-sm col-4"></span><span class="placeholder placeholder-sm col-4 me-2"></span><span class="placeholder placeholder-sm col-6"></span><span class="placeholder placeholder-sm col-8"></span></p>
                        </div>
                    </div>
                </article>
            </div>
            <div v-else>
                <div v-if="blogs.length > 0">
                    <div v-for="blog in blogs" :key="blog.title" class="fade-in">
                        <article class="row g-0 border-0 mb-4 ">
                            <a class="col-sm-5 bg-repeat-0 bg-size-cover bg-position-center rounded-5" v-bind:href="'/blog/' + blog.datePosted.substring(0,4) + '/' + blog.urlHandle " v-bind:style="{ 'background-image': 'url(https://res.cloudinary.com/dkpmezpui/image/upload/v1707656187/almondcoveassets/blogs/' + blog.datePosted.substring(0, 4) + '/' + blog.urlHandle + '/cover.webp)', 'min-height': '14rem' }"></a>
                            <div class="col-sm-7">
                                <div class="pt-4 pb-sm-4 ps-sm-4 pe-lg-4 ">
                                    <h3>
                                        <a v-bind:href="'/blog/' + blog.datePosted.substring(0, 4)+'/' + blog.urlHandle">
                                            {{blog.title}}
                                        </a>
                                    </h3>
                                    <p class="d-sm-none d-md-block">{{blog.description}}</p><div class="d-flex flex-wrap align-items-center mt-n2"><a class="nav-link text-muted fs-sm fw-normal d-flex align-items-end p-0 mt-2" href="#">{{blog.comments}}<i class="ai-message fs-lg ms-1"></i></a><span class="fs-xs opacity-20 mt-2 mx-3">|</span><span class="fs-sm text-muted mt-2">{{blog.datePosted.substring(0, 7)}}</span><span class="fs-xs opacity-20 mt-2 mx-3">|</span><router-link class="badge text-nav fs-xs border mt-2" :to="'/blogs/category/'+  blog.locator ">{{blog.category}}</router-link></div>
                                </div>
                            </div>
                        </article>
                    </div>
                </div>
                <div v-else>
                    <h1 class="">no blogs found!!</h1>
                </div>
            </div>
                            `,
    data() {
        return {
            blogs: [],
            isLoading: true,
            titleItem: 'Blogs'
        };
    },
    async mounted() {

        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
        try {

            const response = await axios.get('/api/blogs/0/na/na');
            const data = response.data;
            this.blogs = data;
            console.log(data);
        } catch (error) {
            console.error('Error fetching data from API:', error);
        } finally {
            this.isLoading = false;

        }
    },
    watch: {
        "_$route.query.search": {
            handler(newSearchValue: string | any[], oldSearchValue: any) {
                this.$nextTick(async () => {
                    if (typeof newSearchValue === 'string' && newSearchValue.length >= 1) {
                        this.loadSearches(newSearchValue);
                        this.titleItem = "Blogs \'" + newSearchValue + "\'";
                    } else {
                        this.loadDefaults();
                        this.titleItem = "Blogs";
                    }
                });
            },
            immediate: true
        },
        get "$route.query.search"() {
            return this["_$route.query.search"];
        },
        set "$route.query.search"(value) {
            this["_$route.query.search"] = value;
        },
    },

    methods: {
        async loadDefaults() {
            try {

                const response = await axios.get('/api/blogs/0/na/na');
                const data = response.data;
                this.blogs = data;
                console.log("default triggered");
            } catch (error) {
                console.error('Error fetching data from API:', error);
            } finally {
                this.isLoading = false;

            }
        },
        async loadSearches(newSearchValue: string) {
            try {
                this.titleItem = "Searching";
                const response = await axios.get('/api/blogs/0/search/' + newSearchValue);
                const data = response.data;
                this.blogs = data;
            } catch (error) {
                console.error('Error fetching data from API:', error);
            } finally {
                this.isLoading = false;
            }
        }
    }
};
const routes = [{
    path: '/blogs',
    component: HomeComponent
}, {
    path: '/blogs/:param1/:param2',
    component: CategorisedBlogComponent,
    props: true
}];
const router = VueRouter.createRouter({
    history: VueRouter.createWebHistory(),
    routes
});
const app = Vue.createApp({
    data() {
        return {
            isLoading: true,
            titleItem: 'Blogs',
            categories: [],
            inputValue: ''
        };
    },
    async mounted() {
        this.loadCategories();
    },
    methods: {
        async navigateToBlog() {
            this.$nextTick(() => {
                if (this.inputValue.length >= 1) {
                    this.$router.push({ path: '/blogs', query: { search: this.inputValue } });
                    this.titleItem = "searching";
                } else {
                    this.$router.push({ path: '/blogs' });
                }
            });
        },
        async loadCategories() {
            try {
                const response = await axios.get('/api/blogs/categories/load');
                const data = response.data;
                this.categories = data;
                //  console.log(data);
            } catch (error) {
                console.error('Error fetching data from API:', error);
            } finally {
                this.isLoading = false;
            }
        }
    }

});
app.use(router);
app.mount('#app');