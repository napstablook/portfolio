// Declare variables
const submit = $('#submit-form'),
      table = $('#pixel-canvas'),
      gridHeight = $('#grid-height'),
      gridWidth = $('#grid-width'),
      colorPicker = $('#color-picker'),
      colorButtons = $('span'),
      clear = $('.clear'),
      settings = $('.settings'),
      overlay = $('.overlay'),
      recentColor1 = $('.recent-item1'),
      recentColor2 = $('.recent-item2'),
      recentColor3 = $('.recent-item3');
let currentColor = $('#color-picker').val(),
    recentColors = [recentColor1.css('background-color'),
                    recentColor2.css('background-color'),
                    recentColor3.css('background-color')],
    isClicked = false;


// Declare functions
function makeGrid() {
    table.find('*').remove();
    let html = '';
    for (let i = 0; i < limitGridInput(gridHeight); i++) {
        html += '<tr>' + '<td></td>'.repeat(limitGridInput(gridWidth)) + '</tr>';
    }
    table.append(html);
}

function paintCell(e) {
    $(e.target).css('background', currentColor);
}

function limitGridInput(input) {
    if (input.value < 5) {
        // This returns the value 5 w/out 'return'
        input.value = 5;
    } else if (input.value > 40) {
        input.value = 40;
    } else {
        // It works without '$()' but it gives me an error
        return $(input).val();
    }
}

let k = 0;
function changeRecentColor() {
    switch (k) {
        case 0:
            recentColor1.css('background-color', currentColor);
            recentColors[0] = currentColor;
            k++;
            break;
        case 1:
            recentColor2.css('background-color', currentColor);
            recentColors[1] = currentColor;
            k++;
            break;
        case 2:
            recentColor3.css('background-color', currentColor);
            recentColors[2] = currentColor;
            k = 0;
            break;
    }
}


// This changes what the input says if you try an invalid number
gridHeight.change(function() {
    limitGridInput(this);   
});
gridWidth.change(function() {
    limitGridInput(this);
});


// change color value
colorPicker.change(function() {
    currentColor = $(this).val();
});
colorButtons.click(function() {
    currentColor = $(this).css('background-color');
});


// Grid behavior
table.on('click', 'td', function(e) {
    paintCell(e);
}).on('mousedown', 'td', function() {
    isClicked = true;
    if (currentColor !== recentColors[0] &&
        currentColor !== recentColors[1] &&
        currentColor !== recentColors[2]) {
        changeRecentColor();
    }
}).on('mouseup mouseleave', function() {
    isClicked = false;
}).on('mouseover', 'td', function(e) {
    if (isClicked) {
        paintCell(e);
    }
});


// Buttons behavior
settings.click(function() {
    // Overlay starts with none then it's set to flex with .css(),
    // then none w/.hide(), then it goes back to flex w/.fadeIn()
    // If I don't do this fadeIn() uses display: block on the overlay
    // It seems like fadeIn() sets display to inherit
    $('.overlay').css('display', 'flex').hide().fadeIn();
});
clear.click(function() {
    makeGrid();
})


// Hide overlay only by clicking the overlay and not its children
overlay.click(function(e) {
    let parent = this;
    let child = e.target;
    // $(child)[0] and $('.arrow-back')[0] are both "<i class="arrow-back material-icons md-48 md-light">arrow_back</i>"
    // Use console to understand this better
    if (child === parent || $(child)[0] === $('.arrow-back')[0]) {
        $(this).fadeOut();
    }
});


// Button to draw grid
submit.submit(function(e) {
    e.preventDefault();
    makeGrid();
});

// Make the initial grid when page is first loaded
makeGrid();
