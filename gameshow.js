// gameshow.js

import { layoutData } from './data.js';

import { createCanvas } from './functions.js';
//import * as f from  './functions.js';

//`

// *** Override console.log for exporting into a file
var logs = [];
const originalConsoleLog = console.log;
console.log = function (message) {
    if (typeof message === 'object') {
        // Convert objects to a string representation
        message = JSON.stringify(message);
    }

    logs.push(message);

    // You can still log to the console if needed
    originalConsoleLog(message);
};

document.getElementById("exportButton").addEventListener("click", function () {
    // Save logs to a file
    let logString = logs.join('\n');

    // Create a Blob containing the text data
    const blob = new Blob([logString], { type: 'text/plain' });

    // Create a download link
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.download = 'logs.txt';

    // Append the link to the document
    document.body.appendChild(link);

    // Trigger the download
    link.click();

    // Remove the link from the document
    document.body.removeChild(link);
});

// *** allow exporting of HTML to inspect/debug elements
// Create the "Export HTML" button
const exportHTMLButton = document.createElement('button');
exportHTMLButton.id = 'exportHTMLButton';
exportHTMLButton.textContent = 'Export HTML';

// Append the button to the document body
document.body.appendChild(exportHTMLButton);

// Add an event listener to the "Export HTML" button
exportHTMLButton.addEventListener("click", function () {
    // Get the HTML content of the entire document
    let htmlContent = document.documentElement.outerHTML;

    // Create a Blob containing the HTML content
    const blob = new Blob([htmlContent], { type: 'text/html' });

    // Create a download link
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.download = 'vsim_page.html';

    // Append the link to the document
    document.body.appendChild(link);

    // Trigger the download
    link.click();

    // Remove the link from the document
    document.body.removeChild(link);
});

// *** BEGIN MAIN CODE
/*
const layoutData = [
    // images 
    { id: 'IMG_main_background', type: 'div', level: 'bottom', img_height: 1080, img_width: 1920, path: 'images/main_background.png' },
];
*/

const spacer = document.createElement('div');
document.body.appendChild(spacer);
spacer.innerHTML = '<br><br><br><br><br>';

const parentElement = document.createElement('div'); 
parentElement.id = 'parentElement';
document.body.appendChild(parentElement);
const canvas_template = document.createElement('div');
canvas_template.id = 'canvas_template';
parentElement.appendChild(canvas_template);

// Loop through the layoutData array
layoutData.forEach(data => {
    if (data.level === 'bottom') {
        // Create a new div element for the bottom layer
        const bottomLayer = document.createElement('div');
        
        // Set the id attribute
        bottomLayer.id = data.id;
        
        // Set the CSS styles for absolute positioning and to match the image dimensions
        bottomLayer.style.position = 'absolute';
        bottomLayer.style.width = `${data.img_width}px`; // 1920
        bottomLayer.style.height = `${data.img_height}px`; // 1080
        bottomLayer.style.zIndex = '1'; // Set a z-index to make sure it's at the bottom
        
        // Optionally, set the background image
        bottomLayer.style.backgroundImage = `url('${data.path}')`;
        bottomLayer.style.backgroundSize = 'cover'; // Adjust as needed
        
        // Calculate and set the position relative to parentElement
        const parentRect = parentElement.getBoundingClientRect();
        const dataPositionX = data.x - parentRect.left; // Adjust the positions if needed
        const dataPositionY = data.y - parentRect.top; // Adjust the positions if needed
        bottomLayer.style.left = `${dataPositionX}px`;
        bottomLayer.style.top = `${dataPositionY}px`;
        
        // Append the bottom layer div to the parent element
        parentElement.appendChild(bottomLayer);
    }
});

// after DOM is loaded
document.addEventListener('DOMContentLoaded', function() {

    // create globalLayout div ids
    createCanvas('images/div_template.png', 'canvas_template', 2, function(divsFromImg) {
        // Set z-index for the divs created from the image to appear above the bottom layer
        divsFromImg.forEach(divInfo => {
            const div = document.getElementById(divInfo.id);
            if (div) {
                // Set the position relative to parentElement
                const parentRect = parentElement.getBoundingClientRect();
                const adjustedY = divInfo.position.y - parentRect.top;
                div.style.left = `${divInfo.position.x}px`;
                div.style.top = `${adjustedY}px`;
                div.style.zIndex = '2'; // Adjust the z-index as needed
            }
        });

        // Log divsFromImg for reference
        console.log(divsFromImg);

        // Adjust canvas_template positioning to be over parentElement
        const canvasTemplateRect = canvas_template.getBoundingClientRect();
        const parentElementRect = parentElement.getBoundingClientRect();
        const canvasTemplatePositionX = parentElementRect.left - canvasTemplateRect.left;
        const canvasTemplatePositionY = parentElementRect.top - canvasTemplateRect.top;
        canvas_template.style.position = 'absolute';
        canvas_template.style.left = `${canvasTemplatePositionX}px`;
        canvas_template.style.top = `${canvasTemplatePositionY}px`;
        canvas_template.style.zIndex = '3'; // Set a higher z-index to ensure it's above the parentElement
    });
}); // end DOMContentLoaded





/*
const spacer = document.createElement('div');
document.body.appendChild(spacer);
spacer.innerHTML = '<br><br><br><br><br>';

const parentElement = document.createElement('div'); 
parentElement.id = 'parentElement';
document.body.appendChild(parentElement);
const canvas_template = document.createElement('div');
canvas_template.id = 'canvas_template';
parentElement.appendChild(canvas_template);

// Loop through the layoutData array
layoutData.forEach(data => {
    if (data.level === 'bottom') {
        // Create a new div element for the bottom layer
        const bottomLayer = document.createElement('div');
        
        // Set the id attribute
        bottomLayer.id = data.id;
        
        // Set the CSS styles for absolute positioning and to match the image dimensions
        bottomLayer.style.position = 'absolute';
        bottomLayer.style.width = `${data.img_width}px`; // 1920
        bottomLayer.style.height = `${data.img_height}px`; // 1080
        bottomLayer.style.zIndex = '1'; // Set a z-index to make sure it's at the bottom
        
        // Optionally, set the background image
        bottomLayer.style.backgroundImage = `url('${data.path}')`;
        bottomLayer.style.backgroundSize = 'cover'; // Adjust as needed
        
        // Calculate and set the position relative to parentElement
        const parentRect = parentElement.getBoundingClientRect();
        const dataPositionX = data.x - parentRect.left; // Adjust the positions if needed
        const dataPositionY = data.y - parentRect.top; // Adjust the positions if needed
        bottomLayer.style.left = `${dataPositionX}px`;
        bottomLayer.style.top = `${dataPositionY}px`;
        
        // Append the bottom layer div to the parent element
        parentElement.appendChild(bottomLayer);
    }
});

// after DOM is loaded
document.addEventListener('DOMContentLoaded', function() {

    // create globalLayout div ids
    createCanvas('images/div_template.png', 'canvas_template', 2, function(divsFromImg) {
        // Set z-index for the divs created from the image to appear above the bottom layer
        divsFromImg.forEach(divInfo => {
            const div = document.getElementById(divInfo.id);
            if (div) {
                // Set the position relative to parentElement
                div.style.left = `${divInfo.position.x}px`;
                div.style.top = `${divInfo.position.y}px`;
                div.style.zIndex = '2'; // Adjust the z-index as needed
            }
        });

        // Log divsFromImg for reference
        console.log(divsFromImg);
    });
}); // end DOMContentLoaded
*/