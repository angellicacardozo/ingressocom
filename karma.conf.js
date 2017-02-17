/**
**	Karma configuration file
**  @run ./node_modules/karma/bin/karma start
**/
module.exports = function(config) {
	config.set({

		/**
		** Base path that will be used to resolve all patterns (eg. files, exclude)
		**/
	    basePath: '',

	    /**
	    ** Configure Jasmine for the tests
	    ** Available frameworks: https://npmjs.org/browse/keyword/karma-adapter
	    **/
	    frameworks: ['jasmine'],

	    /**
	    ** List of files and patterns to load in the browser
	    **/
	    files: [
	        'src/components/angular/angular.js'
	        ,'src/components/angular-mocks/angular-mocks.js'
	        ,'src/components/angular-bootstrap/ui-bootstrap-tpls.min.js'
	        ,'src/components/angular-cookies/angular-cookies.min.js'
	        ,'src/components/angular-animate/angular-animate.min.js'
	        ,'src/components/a0-angular-storage/dist/angular-storage.min.js'
	        ,'src/components/angular-ui-router/release/angular-ui-router.min.js'
	        ,'src/js/**/*.js'
	        ,'spec/**/*.js'
	        ,'src/templates/**/*.html'
	    ],

	   	/**
	   	** List of files to exclude
	   	**/
	    exclude: [
	        'dist/**/*.js'
	        ,'spec/e2e/**/*.js'
	    ],

	    /**
	    ** Test results reporter to use
	    **		possible values: 'dots', 'progress'
	    **		available reporters: https://npmjs.org/browse/keyword/karma-reporter
	    **/
		reporters: [
			'progress'
			,'spec'
			,'dots'
			,'junit'
		],

		/**
		** Please note the test-result.xml file will be output to the present 
		**	working directory (and you will need to tell Jenkins where to find it).
		**/
		junitReporter: {
		  outputFile: 'test-results.xml'
		},

	    /**
	    ** Web server port
	    **/
	    port: 9876,

	    /**
	    ** Enable / disable colors in the output (reporters and logs)
		**/
	    colors: true,

	    /**
	    **	Level of logging
	    **/
	    logLevel: config.LOG_INFO,

	    /**
	    ** Enable / disable watching file and executing tests whenever any file changes
	    **/
		autoWatch: true,

		/**
		** Start these browsers
		** Available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
		**/
    	browsers: [
    		'Chrome'
    		,'PhantomJS'
    	],

		/**
		** Have phantomjs exit if a ResourceError is encountered 
		** (useful if karma exits without killing phantom) 
		**/
		phantomjsLauncher: {
			exitOnResourceError: true
		},

    	/**
    	**	Continuous Integration mode
    	**  	if true, Karma captures browsers, runs the tests and exits
    	**/
		singleRun: true,

		/**
		** Concurrency level
		** how many browser should be started simultanous
 		**/ 
    	concurrency: Infinity,

		/**
		** Preprocessors
		** help us to load HTML into unit tests
 		**/ 
		preprocessors: {
		    "src/templates/**/*.html": "ng-html2js"
		},
		ngHtml2JsPreprocessor: {
        	moduleName: 'ingresso.templates'
        	,prependPrefix: 'src/'
    	},
    	plugins: [
	        'karma-jasmine'
	        ,'karma-ng-html2js-preprocessor'
	        ,'karma-chrome-launcher'
	        ,'karma-spec-reporter'
	        ,'karma-phantomjs-launcher'
	        ,'karma-junit-reporter'
	    ]
	});
};