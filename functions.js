// functions.js

// import arrays
import { layoutData } from './data.js';

export function newEl(name, type, parentID, id, cls, content) {
    var element = document.createElement(type);
    parentID.appendChild(element);
    
    if (id) {
        element.id = id;
    }
    
    if (cls) {
        element.className = cls;
    }
    
    if (content) {
        element.innerHTML = content;
    }

    window[name] = element;
}

export function createCanvas(imageUrl, containerId, zIndex, callback) {
    var img = new Image();
    img.src = imageUrl;

    img.onload = function() {
        var canvas = document.createElement('canvas');
        var ctx = canvas.getContext('2d');
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0, img.width, img.height);
        var imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        var data = imageData.data;
        var container = document.getElementById(containerId);
        var divsFromImg = []; // Array to store div information

        // Function to check if a pixel is black
        function isBlack(x, y) {
            var index = (y * canvas.width + x) * 4;
            return data[index] === 0 && data[index + 1] === 0 && data[index + 2] === 0;
        }

        // Function to flood fill a shape starting from a given position
        function floodFill(x, y, id) {
            var stack = [{ x: x, y: y }];
            var minX = canvas.width;
            var minY = canvas.height;
            var maxX = 0;
            var maxY = 0;
            while (stack.length > 0) {
                var currentPixel = stack.pop();
                var currentX = currentPixel.x;
                var currentY = currentPixel.y;
                if (currentX < 0 || currentX >= canvas.width || currentY < 0 || currentY >= canvas.height || !isBlack(currentX, currentY)) {
                    continue;
                }
                data[(currentY * canvas.width + currentX) * 4] = 255; // Mark pixel as visited
                minX = Math.min(minX, currentX);
                minY = Math.min(minY, currentY);
                maxX = Math.max(maxX, currentX);
                maxY = Math.max(maxY, currentY);
                stack.push({ x: currentX - 1, y: currentY });
                stack.push({ x: currentX + 1, y: currentY });
                stack.push({ x: currentX, y: currentY - 1 });
                stack.push({ x: currentX, y: currentY + 1 });
            }
            // Create a div element for the shape with a unique ID
            var width = maxX - minX + 1;
            var height = maxY - minY + 1;
            var div = document.createElement('div');
            var divId = 'box_' + id;
            div.setAttribute('id', divId);
            div.style.position = 'absolute';
            div.style.left = minX + 'px';
            div.style.top = minY + 'px';
            div.style.width = width + 'px';
            div.style.height = height + 'px';
            div.style.border = '1px solid black';
            container.appendChild(div);

            // Create object to store div information
            var divInfo = {
                id: divId,
                position: { x: minX, y: minY },
                size: { width: width, height: height }
                // Add any other information you want to store
            };
            divsFromImg.push(divInfo); // Push div information to array
        }

        // Store container div information
        var containerInfo = {
            id: containerId,
            position: { x: 0, y: 0 }, // Assuming container is positioned at (0, 0)
            size: { width: canvas.width, height: canvas.height }
            // Add any other information you want to store
        };
        divsFromImg.push(containerInfo); // Push container info to array

        container.style.position = 'absolute';
        container.style.top = containerInfo.position.y + 'px';
        container.style.left = containerInfo.position.x + 'px';
        container.style.width = containerInfo.size.width + 'px';
        container.style.height = containerInfo.size.height + 'px';
        container.style.zIndex = zIndex; // Set the zIndex

        var shapeId = 1;
        for (var y = 0; y < canvas.height; y++) {
            for (var x = 0; x < canvas.width; x++) {
                if (isBlack(x, y)) {
                    floodFill(x, y, shapeId);
                    shapeId++;
                }
            }
        }

        callback(divsFromImg); // Call the callback function with divsFromImg
    };
}










/*
export function createCanvas(imageUrl, containerId, callback) {
    // Create a new image element
    var img = new Image();
    
    // Set the src attribute to the provided image URL
    img.src = imageUrl;
    
    // Wait for the image to load
    img.onload = function() {
        // Create a canvas element
        var canvas = document.createElement('canvas');
        var ctx = canvas.getContext('2d');
        
        // Set the canvas dimensions to match the image
        canvas.width = img.width;
        canvas.height = img.height;
        
        // Draw the image onto the canvas
        ctx.drawImage(img, 0, 0, img.width, img.height);
        
        // Get the pixel data of the image
        var imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        var data = imageData.data;
        
        // Create a container element
        var container = document.getElementById(containerId);
        
        // Initialize an array to store the IDs of the created div elements
        var divIds = [];
        
        // Function to check if a pixel is black
        function isBlack(x, y) {
            var index = (y * canvas.width + x) * 4;
            return data[index] === 0 && data[index + 1] === 0 && data[index + 2] === 0;
        }
        
        // Function to flood fill a shape starting from a given position
        function floodFill(x, y, id) {
            var stack = [{x: x, y: y}];
            var minX = canvas.width;
            var minY = canvas.height;
            var maxX = 0;
            var maxY = 0;
            while (stack.length > 0) {
                var currentPixel = stack.pop();
                var currentX = currentPixel.x;
                var currentY = currentPixel.y;
                if (currentX < 0 || currentX >= canvas.width || currentY < 0 || currentY >= canvas.height || !isBlack(currentX, currentY)) {
                    continue;
                }
                data[(currentY * canvas.width + currentX) * 4] = 255; // Mark pixel as visited
                minX = Math.min(minX, currentX);
                minY = Math.min(minY, currentY);
                maxX = Math.max(maxX, currentX);
                maxY = Math.max(maxY, currentY);
                stack.push({x: currentX - 1, y: currentY});
                stack.push({x: currentX + 1, y: currentY});
                stack.push({x: currentX, y: currentY - 1});
                stack.push({x: currentX, y: currentY + 1});
            }
            // Create a div element for the shape with a unique ID
            var width = maxX - minX + 1;
            var height = maxY - minY + 1;
            var div = document.createElement('div');
            var divId = 'box_' + id;
            div.setAttribute('id', divId);
            divIds.push(divId);
            div.style.position = 'absolute';
            div.style.left = minX + 'px';
            div.style.top = minY + 'px';
            div.style.width = width + 'px';
            div.style.height = height + 'px';
            div.style.border = '1px solid black';
            container.appendChild(div);
        }
        
        // Iterate through the pixels to identify black shapes and create div elements for them
        var shapeId = 1;
        for (var y = 0; y < canvas.height; y++) {
            for (var x = 0; x < canvas.width; x++) {
                if (isBlack(x, y)) {
                    floodFill(x, y, shapeId);
                    shapeId++;
                }
            }
        }

        // callback to ensure full execution first
        var divIds = callback(divIds);

        // Return the array of div IDs
        return divIds;
    };
}
// USAGE:
// createCanvas('your-image-url.jpg', 'container-id');
*/