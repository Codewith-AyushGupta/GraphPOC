import React from 'react'

function Filters() {
    function processClick(event){
        alert(event.target.id);
    }
  return (
    <div>
      <div class='filterContainer'>
            <table class="filterTable">
                <tr>
                    <td>
                        <button id="GTD" onClick={processClick} class='filterBtn'>Get today data</button>
                    </td>
                </tr>
                <tr>
                    <td>
                        <button id="GLWD" onClick={processClick} class='filterBtn'>Get Last Week data</button>
                    </td>
                </tr>
                <tr>
                    <td>
                        <button id="GLMD" onClick={processClick} class='filterBtn'>Get Last month data</button>
                    </td>
                </tr>
                <tr>
                    <td>
                        <button id="GLYD" onClick={processClick} class='filterBtn'>Get Last year data</button>
                    </td>
                </tr>
            </table>

        </div>

    </div>
  )
}

export default Filters
