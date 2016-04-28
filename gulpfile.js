var gulp = require('gulp');

var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var uglifycss = require('gulp-uglifycss');
var RevAll = require('gulp-rev-all');
var revReplace = require('gulp-rev-replace');
var gulpsync = require('gulp-sync')(gulp);

var jsVendors =  [
    'app/scripts/bower_components/angular/angular.min.js',
    'app/bower_components/angular-route/angular-route.min.js',
    'app/bower_components/angular-animate/angular-animate.min.js',
    'app/bower_components/angular-aria/angular-aria.min.js',
    'app/bower_components/angular-material/angular-material.min.js',
    'app/bower_components/angular-messages/angular-messages.min.js',
    'app/bower_components/ngprogress/build/ngprogress.min.js',
    'app/bower_components/angular-local-storage/dist/angular-local-storage.min.js',
];

var jsCustom = [
    'app/app.js',
    'app/scripts/services/constantKeyValueService.js',
    'app/scripts/services/apiService.js',
    'app/scripts/services/toastService.js',
    'app/scripts/services/utilService.js',
    'app/scripts/services/ngProgressbarService.js',
    'app/scripts/services/loginService.js',
    'app/scripts/services/orderService.js',
    'app/scripts/directives/psaHeader.js',
    'app/scripts/directives/psaSidenav.js',
    'app/scripts/controllers/registrationController.js',
    'app/scripts/controllers/profileController.js',
    'app/scripts/controllers/orderController.js',
    'app/scripts/controllers/productController.js',
    'app/scripts/controllers/loginPopupController.js',
    'app/scripts/controllers/paymentController.js'
];

var stylesheets = [
    'app/bower_components/angular-material/angular-material.min.css',
    'app/styles/style.css'
];

gulp.task('vendorScripts', function() {
    return gulp.src(jsVendors)
                .pipe(concat('vendor.js'))
                .pipe(gulp.dest('build/js'));
});

gulp.task('buildVendorScripts', function() {
    var revAll = new RevAll();
    return gulp.src(jsVendors)
                .pipe(concat('vendor.js'))
                .pipe(rename({suffix: '.min'}))
                .pipe(revAll.revision())
                .pipe(gulp.dest('build/js/vendor'))
                .pipe(revAll.manifestFile())
                .pipe(gulp.dest('build/js/vendor'))
                .pipe(revAll.versionFile())
                .pipe(gulp.dest('build/js/vendor'));
});

gulp.task('styles', function() {
    var revAll = new RevAll();
    return gulp.src(stylesheets)
                .pipe(concat('styles.css'))
                .pipe(rename({suffix: '.min'}))
                .pipe(uglifycss())
                .pipe(revAll.revision())
                .pipe(gulp.dest('build/css'))
                .pipe(revAll.manifestFile())
                .pipe(gulp.dest('build/css'))
                .pipe(revAll.versionFile())
                .pipe(gulp.dest('build/css'));
});

gulp.task('buildCustomScripts', function() {
    var revAll = new RevAll();
    return gulp.src(jsCustom)
                .pipe(concat('custom.js'))
                .pipe(rename({suffix: '.min'}))
                .pipe(uglify())
                .pipe(revAll.revision())
                .pipe(gulp.dest('build/js'))
                .pipe(revAll.manifestFile())
                .pipe(gulp.dest('build/js'))
                .pipe(revAll.versionFile())
                .pipe(gulp.dest('build/js'));
});

// Default Task
gulp.task('default', ['vendorScripts', 'styles']);

// production build
gulp.task('build', ['buildVendorScripts', 'styles', 'buildCustomScripts']);
