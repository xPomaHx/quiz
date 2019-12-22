<template>
    <v-app>
        <div class="quiz-container">
            <div>
                <v-btn
                    color="#67bd8e"
                    @click="prev"
                    :disabled="prevIsDisabled"
                    class="bro-btn-back"
                >{{alreadyComplite?'Пройти снова':'Назад'}}</v-btn>
            </div>
            <div class="quiz-step-container">
                <div class="step1" v-show="currentStep===1">
                    <p>У каждого из нас есть свои небесные помощники, которые помогают нам в наших трудностях и направляют в моменты сомнений.</p>
                    <p>
                        Все люди разные и каждому из нас дан свой небесный покровитель, помогающий именно ему, который опекает, заботится и оберегает. Он дан
                        свыше, чтобы защищать охранять и помогать. Наши просьбы и молитвы лучше и быстрее всего слышат и исполняют именно они.
                    </p>
                    <p>
                        <strong>Именно поэтому очень важно знать, кто является Вашим небесным покровителем. Мы можем помочь Вам узнать вашего небесного покровителя:</strong>
                    </p>
                    <v-btn
                        outline
                        color="indigo"
                        @click="next"
                        class="bro-btn-next"
                        :disabled="nextIsDisabled"
                    >Хочу узнать кто мой небесный покровитель</v-btn>
                    <small>* Нажимая на кнопку, вы соглашаетесь на обработку персональных данных</small>
                </div>
                <div class="step2" v-show="currentStep===2">
                    <p>
                        <strong>Для кого вы хотите узнать небесного покровителя?</strong>
                    </p>
                    <v-radio-group v-model="dlyakogo">
                        <v-radio label="Для Себя" value="1"></v-radio>
                        <v-radio label="Для другого человека (Не для себя)" value="0"></v-radio>
                    </v-radio-group>
                    <v-btn
                        outline
                        color="indigo"
                        @click="next"
                        class="bro-btn-next"
                        :disabled="nextIsDisabled"
                    >Далее</v-btn>
                </div>
                <div class="step3" v-show="currentStep===3">
                    <p>
                        <strong>Ваш святой небесный покровитель носит ваше имя. Чтобы его определить, скажите, как вас зовут?</strong>
                    </p>
                    <v-combobox
                        v-model="name"
                        :items="namesAutoComplite(namesearch)"
                        :search-input.sync="namesearch"
                        hide-no-data
                        :label="`Введите имя`"
                        :placeholder="`Введите имя`"
                        :rules="[isNameInList]"
                    ></v-combobox>
                    <v-btn
                        outline
                        color="indigo"
                        @click="next"
                        class="bro-btn-next"
                        :disabled="nextIsDisabled"
                    >Далее</v-btn>
                </div>
                <div class="step4" v-show="currentStep===4">
                    <p>
                        <strong>Вас крестили?</strong>
                    </p>
                    <v-radio-group v-model="vaskrestili">
                        <v-radio label="Да" value="1"></v-radio>
                        <v-radio label="Нет" value="0"></v-radio>
                    </v-radio-group>
                    <v-btn
                        outline
                        color="indigo"
                        @click="next"
                        class="bro-btn-next"
                        :disabled="nextIsDisabled"
                    >Далее</v-btn>
                </div>
                <div class="step5" v-show="currentStep===5">
                    <p>
                        <strong>Вы помните когда вас крестили?</strong>
                    </p>
                    <p
                        style="text-align: left;
    align-self: flex-start;
    margin-bottom:-0px;
    margin-left: 94px;"
                    >Выберите дату</p>
                    <div class="bro-row">
                        <v-select
                            v-model="datekrest1"
                            :items="dayInMonth(datekrest2,datekrest3)"
                            placeholder="--"
                            :disabled="vaskrestilipomny"
                        ></v-select>
                        <v-select
                            v-model="datekrest2"
                            :items="['Январь','Февраль','Март','Апрель','Май','Июнь','Июль','Август','Сентябрь','Октябрь','Ноябрь','Декабрь'].map((el,i)=>({text:el,value:i+1}))"
                            placeholder="--"
                            :disabled="vaskrestilipomny"
                        ></v-select>
                        <v-select
                            v-model="datekrest3"
                            placeholder="----"
                            :disabled="vaskrestilipomny"
                            :items="(new Array(90)).fill(0).map((_,i)=>i+(2019-90))"
                        ></v-select>
                    </div>
                    <v-checkbox v-model="vaskrestilipomny" label="Не помню"></v-checkbox>
                    <v-btn
                        outline
                        color="indigo"
                        @click="next"
                        class="bro-btn-next"
                        :disabled="nextIsDisabled"
                    >Далее</v-btn>
                </div>
                <div class="step6" v-show="currentStep===6">
                    <p>
                        <strong>Какое имя дали вам при крещении?</strong>
                        <br />Введите если имя отличается от мирского
                    </p>
                    <v-checkbox v-model="imyaprikresh" :label="name" @change="name2=null"></v-checkbox>
                    <v-autocomplete
                        v-model="name2"
                        :items="namesAutoComplite(name2search)"
                        :search-input.sync="name2search"
                        hide-no-data
                        :label="`Введите имя`"
                        placeholder="Введите имя"
                        @change="imyaprikresh=null"
                        persistent-hint
                    ></v-autocomplete>
                    <v-btn
                        outline
                        color="indigo"
                        @click="next"
                        class="bro-btn-next"
                        :disabled="nextIsDisabled"
                    >Далее</v-btn>
                </div>
                <div class="step7" v-show="currentStep===7">
                    <p>
                        <strong>День вашего появления на свет имеет важное значение, от этого зависит кто ваш небесный покровитель. Введите ваш день рождения.</strong>
                    </p>
                    <p
                        style="text-align: left;
    align-self: flex-start;
    margin-bottom:-0px;
    margin-left: 94px;"
                    >Выберите дату</p>
                    <div class="bro-row">
                        <v-select
                            v-model="datebeth1"
                            :items="dayInMonth(datebeth2,datebeth3)"
                            placeholder="--"
                        ></v-select>
                        <v-select
                            v-model="datebeth2"
                            :items="['Январь','Февраль','Март','Апрель','Май','Июнь','Июль','Август','Сентябрь','Октябрь','Ноябрь','Декабрь'].map((el,i)=>({text:el,value:i+1}))"
                            placeholder="--"
                        ></v-select>
                        <!-- <v-select
                            v-model="datebeth3"
                            placeholder="----"
                            :items="(new Array(90)).fill(0).map((_,i)=>i+(2019-90))"
                        ></v-select>-->
                    </div>
                    <v-btn
                        outline
                        color="indigo"
                        @click="next"
                        class="bro-btn-next"
                        :disabled="nextIsDisabled"
                    >Далее</v-btn>
                </div>

                <div class="step8" v-show="currentStep===8">
                    <p>
                        <strong>Поздравить вас с вашими именинами – днем памяти вашего небесного покровителя – большая радость для нас. Если хотите чтобы мы это сделали, пожалуйста, оставьте вашу почту</strong>
                    </p>
                    <v-text-field
                        ref="email"
                        v-model="email"
                        :rules="[rules.email]"
                        label="Ваш e-mail"
                        placeholder="Например name@name.ru"
                    ></v-text-field>
                    <v-btn
                        outline
                        color="indigo"
                        @click="next"
                        class="bro-btn-next"
                        :disabled="nextIsDisabled"
                    >Далее</v-btn>
                </div>
                <div class="step9" v-show="currentStep===9">
                    <p>
                        <span v-if="!isNameNew && !alreadyComplite">Ваш святой небесный покровитель –</span>
                        <br />
                        <strong>{{curLineData.name}}</strong>
                        <br />
                        {{curLineData.discription}}
                    </p>
                    <div class="bro-row">
                        <div
                            class="bro-col"
                            v-for="(good,index) in goods"
                            :key="index"
                            @click="next(good)"
                        >
                            <div
                                class="bro-img"
                                :style="{'background-image': 'url(https://shop.svyatsy.org/'+good.imgSrc+')'}"
                            ></div>
                            <div class="bro-vnalichii">В наличии</div>
                            <h4>{{good.title}}</h4>
                            <div class="bro-price">
                                <small v-show="!!good.price1">{{good.price1}}</small>
                                <span v-show="!!good.price2">{{good.price2}}</span>
                            </div>
                            <v-btn
                                outline
                                color="green"
                                class="bro-btn-next"
                                :disabled="nextIsDisabled"
                            >Подробнее</v-btn>
                        </div>
                    </div>
                    <v-btn
                        outline
                        color="indigo"
                        @click="next"
                        class="bro-btn-next"
                        :disabled="nextIsDisabled"
                    >Посмотреть все с {{curLineData.name}}</v-btn>
                </div>
                <div class="step10" v-show="currentStep===10">
                    <p>
                        <strong>Крещение – важное событие с жизни человека. Таинство крещения проводятся в Церкви и для участия в нем надо обратиться в Храм. Так же, для осуществления таинства крещения, следует приобрести крестильную рубашку, крестик и рушник</strong>
                    </p>
                    <v-btn
                        outline
                        color="indigo"
                        @click="next"
                        class="bro-btn-next"
                        :disabled="nextIsDisabled"
                    >Купить всё необходимое для таинства крещения</v-btn>
                </div>
            </div>
        </div>
    </v-app>
</template>


<script>
import cfg from "@/config.js";

function postData(url = "", data = {}) {
    return fetch(url, {
        method: "POST",
        mode: "cors",
        cache: "no-cache",
        credentials: "same-origin",
        headers: {
            "Content-Type": "application/json"
        },
        redirect: "follow",
        referrer: "no-referrer", //
        body: JSON.stringify(data)
    });
}
function jsUcfirst(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}
export default {
    name: "App",
    components: {},
    data() {
        return {
            date: new Date().toISOString().substr(0, 10),
            menu1: false,
            menu2: false,

            rules: {
                required: value => !!value || "Обязательно.",
                counter: value => value.length <= 20 || "Max 20 characters",
                email: value => {
                    const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                    return pattern.test(value) || "Некорректный e-mail.";
                }
            },
            namesXlsData: [],
            names: [],

            email: "",
            dlyakogo: "1",
            currentStep: 1,
            name: "",
            namesearch: "",
            vaskrestili: "1",
            vaskrestilipomny: true,
            datekrest1: undefined,
            datekrest2: undefined,
            datekrest3: undefined,
            datebeth1: undefined,
            datebeth2: undefined,
            datebeth3: 2000,
            imyaprikresh: true,
            name2: "",
            name2search: "",
            alreadyComplite: false,
            curLineDataCashed: {},
            isNameNew: false,

            goods: [
                {
                    title: "Крест серебряный, позолота 5113",
                    link: "https://shop.svyatsy.org/",
                    price1: "3 150 руб.",
                    price2: "2 930 руб.",
                    imgSrc: "assets/images/shop/dominoes/RAR-248m_enl.jpg"
                },
                {
                    title: "Крест серебряный, позолота 5113",
                    link: "https://shop.svyatsy.org/",
                    price1: "3 150 руб.",
                    price2: "2 930 руб.",
                    imgSrc: "assets/images/shop/dominoes/RAR-248m_enl.jpg"
                },
                {
                    title: "Крест серебряный, позолота 5113",
                    link: "https://shop.svyatsy.org/",
                    price1: "3 150 руб.",
                    price2: "2 930 руб.",
                    imgSrc: "assets/images/shop/dominoes/RAR-248m_enl.jpg"
                }
            ]
        };
    },
    watch: {
        menu1(val) {
            val &&
                setTimeout(() => (this.$refs.picker.activePicker = "YEAR"), 1);
        },
        menu2(val) {
            val &&
                setTimeout(() => (this.$refs.picker.activePicker = "YEAR"), 1);
        }
    },
    computed: {
        datekrest() {
            return (
                this.datekrest1 + "-" + this.datekrest2 + "-" + this.datekrest3
            );
        },
        datebeth() {
            return this.datebeth1 + "-" + this.datebeth2 + "-" + this.datebeth3;
        },
        formData() {
            return [
                new Date().toISOString(),
                this.email,
                this.dlyakogo,
                this.currentStep,
                this.name,
                this.vaskrestili,
                this.vaskrestilipomny,
                this.datekrest,
                this.datebeth,
                this.imyaprikresh,
                this.name2,
                this.isNameNew
            ];
        },
        curLineData() {
            if (this.alreadyComplite) {
                return this.curLineDataCashed;
            }
            let ret = {
                name: "",
                link: ""
            };
            let name = this.name2 || this.name;
            let [d, m] = (this.datebeth || this.datekrest || "").split("-");
            let date = new Date(`2000-${m}-${d}`);
            let filtredData = this.namesXlsData.filter(
                el => el[0].toLowerCase() == name.toLowerCase()
            );
            if (!filtredData.length || !name || !m || !d) {
                //return ret;
            }
            filtredData.sort((a, b) => {
                if (a[1] > b[1]) {
                    return 1;
                } else {
                    return -1;
                }
            });
            let curEl = filtredData.find(el => date <= el[1]);
            if (!curEl && filtredData.length === 0) {
                curEl = [
                    null,
                    null,
                    "У каждого есть свой Ангел-Хранитель",
                    "https://shop.svyatsy.org/rezultaty-poiska/?search=хранитель",
                    224447,
                    227639,
                    234316,
                    "Ангел-хранитель помогает каждому, сопровождает на жизненном пути"
                ];
            }
            if (!curEl && filtredData.length !== 0) {
                curEl = filtredData[0];
            }
            ret.name = curEl[2];
            ret.link = curEl[3];
            ret.discription = curEl[7];
            ret.goodIds = curEl.slice(4, 7).join(",");
            return ret;
        },
        nextIsDisabled() {
            switch (this.currentStep) {
                case 3:
                    return !this.name;
                case 4:
                    return !this.vaskrestili;
                case 5:
                    return !(
                        (this.datekrest1 &&
                            this.datekrest2 &&
                            this.datekrest3) ||
                        this.vaskrestilipomny
                    );
                case 6:
                    return !(this.imyaprikresh || this.name2);
                case 7:
                    return !(
                        this.datebeth1 &&
                        this.datebeth2 &&
                        this.datebeth3
                    );
                case 8:
                    return !(this.rules.email(this.email) === true);
                default:
                    return false;
            }
        },
        prevIsDisabled() {
            return this.currentStep == 1;
        }
    },
    methods: {
        isNameInList(name) {
            return (
                this.namesXlsData.filter(
                    el => el[0].toLowerCase() == name.toLowerCase()
                ).length !== 0 || "Рекомендуется выбрать из списка"
            );
        },
        dayInMonth(month = 2, year = 2001) {
            const maxDay = new Date(year, month, 0).getDate();
            return new Array(maxDay).fill(0).map((_, i) => i + 1);
        },
        namesAutoComplite(val) {
            return val && val.length > 1 ? this.names : [];
        },
        next(e) {
            switch (this.currentStep) {
                case 1:
                    this.currentStep += 2;
                    break;
                case 3:
                    this.currentStep += 3;
                    this.isNameNew =
                        this.namesXlsData.filter(
                            el => el[0].toLowerCase() == this.name.toLowerCase()
                        ).length === 0;
                    break;
                case 7:
                    {
                        this.getGoods();
                        this.currentStep++;
                    }
                    break;
                case 8:
                    if (this.$metrika) {
                        this.$metrika.reachGoal("quiz-end");
                    }
                    this.currentStep++;
                    break;
                case 9:
                case 10:
                    {
                        this.saveDataToLocalSotrage();
                        let nextUrl = this.curLineData.link;
                        if (e && e.alias) {
                            nextUrl = e.alias;
                        }
                        postData(`${cfg.urls.api}save.php`, this.formData).then(
                            function() {
                                nextUrl = new URL(nextUrl);
                                nextUrl.searchParams.append(
                                    "utm_source",
                                    "quiz1"
                                );
                                window.open(nextUrl.toString(), "_blank");
                                //window.top.location.href = nextUrl;
                            }
                        );
                    }
                    break;
                default:
                    this.currentStep++;
            }
        },
        prev() {
            switch (this.currentStep) {
                case 3:
                    this.currentStep -= 2;
                    break;
                case 6:
                    this.currentStep -= 3;
                    break;
                case 9:
                    if (this.alreadyComplite) {
                        this.alreadyComplite = false;
                        this.currentStep = 1;
                    } else {
                        this.currentStep--;
                    }
                    break;
                case 10:
                    if (this.vaskrestili == 1) {
                        this.currentStep--;
                    } else {
                        this.currentStep = 4;
                    }
                    break;
                default:
                    this.currentStep--;
            }
        },
        saveDataToLocalSotrage() {
            localStorage.quiz = JSON.stringify({
                curLineData: this.curLineData,
                goods: this.goods
            });
        },
        getGoods() {
            let that = this;
            (() => {
                let request = new XMLHttpRequest();
                let queryStr = "?ids=" + that.curLineData.goodIds;
                request.open(
                    "GET",
                    `${cfg.urls.api}getGoods.php${queryStr}`,
                    true
                );
                request.onload = () => {
                    let res = request.response;
                    let { goods } = JSON.parse(res);
                    goods = Object.values(
                        goods.reduce((acc, next) => {
                            if (!acc[next.id]) acc[next.id] = {};
                            acc[next.id].title = next.pagetitle;
                            acc[
                                next.id
                            ].alias = `https://shop.svyatsy.org/tovary/${next.alias}`;
                            if (next.tmplvarid == "32") {
                                acc[next.id].imgSrc = next.value;
                            }
                            if (next.tmplvarid == "46") {
                                acc[next.id].price1 =
                                    Number(next.value).toLocaleString("ru") +
                                    " руб.";
                            }
                            if (next.tmplvarid == "35") {
                                acc[next.id].price2 =
                                    Number(next.value).toLocaleString("ru") +
                                    " руб.";
                            }
                            return acc;
                        }, {})
                    );
                    that.$set(this, "goods", goods);
                };
                request.send();
            })();
        }
    },
    created() {
        var reader = new FileReader();
        reader.onload = e => {
            var data = e.target.result;
            var cfb = XLS.CFB.read(data, {
                type: "binary"
            });
            var wb = XLS.parse_xlscfb(cfb);
            let tar = XLS.utils
                .sheet_to_json(wb.Sheets[wb.SheetNames[0]], {
                    header: 1
                })
                .slice(1);
            tar = tar.filter(([name]) => name);
            tar = tar.map(el => {
                el[0] = jsUcfirst(el[0]);
                let [m, d] = el[1].split("/");
                el[1] = new Date(`2000-${m}-${d}`);
                return el;
            });
            this.namesXlsData = tar;
            this.names = tar.map(el => el[0]);
        };
        var request = new XMLHttpRequest();
        request.open("GET", `./data/names.xls`, true);
        request.responseType = "blob";
        request.onload = function() {
            let oFile = request.response;
            reader.readAsBinaryString(oFile);
        };
        request.send();
        (async () => {
            while (!this.$metrika) {
                await new Promise(resolve => setTimeout(resolve, 999));
            }
            if (this.$metrika) {
                this.$metrika.reachGoal("quiz-start");
            }
        })();
        if (localStorage.quiz) {
            this.currentStep = 9;
            this.alreadyComplite = true;
            const localStorageData = JSON.parse(localStorage.quiz);
            this.curLineDataCashed = localStorageData.curLineData;
            this.goods = localStorageData.goods;
        }
    }
};
</script>

<style>
@import "./main.css";
</style>