function timeStringToDate(date) {
    var hours = date.substr(0, 2);
    var minutes = date.substr(3, 2);
    var seconds = date.substr(6);
    date = new Date();
    date.setHours(hours, minutes, seconds);
    return date;
}

function dateToString(date) {
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var day = date.getDate();
    date = year + '-' + month + '-' + day
    return date;
}

function slide(href, direction) {
    if(!direction) direction = 'left';
    window.plugins.nativepagetransitions.slide({
        "direction" : direction,
        "href" : href,
        "androiddelay": 0
    });
}

var options = {
    "duration"       :  1000, // in milliseconds (ms), default 400
    "slowdownfactor" :    1, // overlap views (higher number is more) or no overlap (1), default 3
    "iosdelay"       :  0, // ms to wait for the iOS webview to update before animation kicks in, default 50
    "androiddelay"   :  0  // same as above but for Android, default 50
};

// wait for deviceready..
document.addEventListener("deviceready", function() {
    // then override any default you want
    window.plugins.nativepagetransitions.globalOptions.duration = 400;
    window.plugins.nativepagetransitions.globalOptions.iosdelay = 0;
    window.plugins.nativepagetransitions.globalOptions.androiddelay = 0;
    window.plugins.nativepagetransitions.globalOptions.winphonedelay = 0;
    window.plugins.nativepagetransitions.globalOptions.slowdownfactor = 4;
    // these are used for slide left/right only currently
    window.plugins.nativepagetransitions.globalOptions.fixedPixelsTop = 0;
    window.plugins.nativepagetransitions.globalOptions.fixedPixelsBottom = 0;

    // Should work on Andriod
    if(StatusBar && statusbarTransparent) {
        // Enable translucent statusbar
        statusbarTransparent.enable();

        // Get the bar back
        StatusBar.show();
    }
    // iOS only
    else if (StatusBar) {
        // Get the bar back
        StatusBar.show();
    }
}, false);