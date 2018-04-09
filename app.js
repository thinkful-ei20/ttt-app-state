const state = {
  Player: 1,
  board: ['&nbsp;','&nbsp;','&nbsp;','&nbsp;','&nbsp;','&nbsp;','&nbsp;','&nbsp;','&nbsp;'],
  Winner: undefined,
};

function createElement (cell, index) {
  return `
  <div class="cell" id="${index}">
     <p>${cell}</p>
  </div>
  `;
}


function createHTML (array) {
  let html = '';
  array.forEach((cell, index) => {
    if(index === 0) html += '<div class="row">';
    if(index % 3 === 2) {
      html += createElement(cell, index);
      html += (index < 8 ) ? '</div> <div class="row">' : '</div>';
    } else {
      html += createElement(cell, index);
    }
  });
  return html;
}

// State modification functions

// Render functions
function renderBoard() {
  $('.board').html(createHTML(state.board));
  console.log('render ran');
}

// Event Listeners

$(renderBoard);