module.exports = {
    name: '180000_sample',

    project: 'flower',

    entry: {
        //전체 선택: "*"
        //싱글 선택: "promo.scss"
        //멀티 선택: ["ui.js","ui2.js"]
        //빌드 제외: false

        sass: 'index.scss',
        js: 'index.js'
    },

    options: {
        sassOutputStyle: 'compact',
        uglifyJs: true,
        webpack: false
    }
};
