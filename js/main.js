////////////////////////////////////////////////////////////////////////////////////////////////////
function getRandomNumber(max) {
    return Math.floor(Math.random() * max);
}

////////////////////////////////////////////////////////////////////////////////////////////////////
function getRandomColorKey(colors) {
    var previousColor = localStorage.getItem('color');
    if(previousColor) {
        delete colors[previousColor];
    }
    var colorsKeys = Object.keys(colors);
    var randomColorKey = colorsKeys[getRandomNumber(colorsKeys.length)];
    localStorage.setItem('color', randomColorKey);
    return randomColorKey;
}

////////////////////////////////////////////////////////////////////////////////////////////////////
function setBackgroundColor(colors) {
    var deg = getRandomNumber(360) + 'deg',
        key = getRandomColorKey(colors),
        left = colors[key].x + ' 0%',
        right = colors[key].y + ' 100%';
    document.body.style.background = 'linear-gradient(' + deg + ',' + left + ',' + right + ')';
}

////////////////////////////////////////////////////////////////////////////////////////////////////
document.addEventListener('DOMContentLoaded', function() {
    var colors = {
        orange: {
            x: 'rgb(255,174,39)',
            y: 'rgb(222,73,109)'
        },
        purple: {
            x: 'rgb(171,73,222)',
            y: 'rgb(73,84,222)'
        },
        blue: {
            x: 'rgb(73,84,222)',
            y: 'rgb(73,221,216)'
        },
        violet: {
            x: 'rgb(222,73,109)',
            y: 'rgb(171,73,222)'
        }
    };
    setBackgroundColor(colors);
});
