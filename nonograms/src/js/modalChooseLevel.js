import low from '../img/low.png';
import middle from '../img/middle.png';
import high from '../img/high.png';

function chooseLevel() {
    return `
        <div class="modal__backgroundLevel">
            <div class="modalChooseLevel">
                <h2>Select the game difficulty level</h2>
                <div class="level_containers">
                    <div class="level_container low" data-level="low" data-size=5>
                        <img class="level_img" src=${low} alt="low level"/>
                        <h3>Low</h3>
                        <h4>Playing field: 5&times5</h4>
                    </div>
                    <div class="level_container middle" data-level="middle" data-size=10>
                        <img class="level_img" src=${middle} alt="middle level"/>
                        <h3>Middle</h3>
                        <h4>Playing field: 10&times10</h4>
                    </div>
                    <div class="level_container high" data-level="high" data-size=15>
                        <img class="level_img" src=${high} alt="high level"/>
                        <h3>High</h3>
                        <h4>Playing field: 15&times15</h4>
                    </div>
                </div>
                
                <div class="choose_buttons">
                <button class="random_button">Random game</button>
                <button class="close_chooseLevel">Close</button>
                </div>
            </div>
        </div>
    `
}

export {chooseLevel};