(function() {
    /**
     * jQuery can't use a shim because it uses RequireJS's define() method to define itself as 'jquery'.
     * Zepto, on the other hand, doesn't use the define() call and it's global is 'Zepto' instead of jQuery.
     * So, we have to make both the jquery path and the shim-ing conditional on which library is going to be used.
     * In addition to Zepto's recommended condition of '__proto__' in {}, I've added an HTML5 check which ensures
     * that older, incompatible browsers (e.g. Firefox 3.6) won't use Zepto.  This means MORE browsers are going to
     * download jQuery than need to, but I'd rather a slow-loading working library for those that don't need it
     * than a quick download of nothing for those that do.
     *
     * Also, thank-you to Modernizr for an example of checking for canvas.
     *
     * Android 2.1 and IOS Safari 3.2 are not Zepto compatible but have canvas support...so these two specific versions
     * may fail.  Otherwise, based on the two cross-references of Zepto and caniuse.com, all browsers should work with
     * this configuration of zepto/jquery fallback.
     */
    var elem            = document.createElement('canvas'),
        isHtml5AndNotIE = '__proto__' in {} && !!(elem.getContext && elem.getContext('2d')),
        shim            = isHtml5AndNotIE ? {'jquery':{exports:'Zepto'}} : {};

    require.config({
        baseUrl:    'scripts',
        defaultExt: '.min.js',
        paths: {
            jquery:     isHtml5AndNotIE ? 'lib/zepto' : 'lib/jquery',
            bootstrap:  'lib/bootstrap'
        },
        shim: shim
    });

    requirejs(['jquery','xing/hash'],function($,hash) {

    });
})();