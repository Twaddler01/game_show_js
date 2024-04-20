// data.js

export function init_layoutData() {

    const layoutData = [
        // images
        { id: 'IMG_main_background', level: 'bottom', type: 'div', img_height: 1080, img_width: 1920, path: 'images/main_background.png', cat: 'img' },
        { id: 'IMG_answer_frame', level: 2, type: 'div', img_height: 1080, img_width: 1920, path: 'images/answer_frame.png', cat: 'img' },

    ];
/*
    // Iterate over the array and set other variables dynamically
    for (let i = 0; i < resourcesData.length; i++) {
        const resourcesIndex = resourcesData[i];
        // (div) stores live updated cnt
        resourcesIndex.resource_live_cnt = 'live_cnt_' + resourcesIndex.id;
        resourcesIndex.res_lbl = 'resource_' + resourcesIndex.id;
        resourcesIndex.gatherDiv = 'gather_div_' + resourcesIndex.id;
        resourcesIndex.gather_btn = 'gather_btn_' + resourcesIndex.id;
        resourcesIndex.gather_lbl = 'gather_' + resourcesIndex.id;
        resourcesIndex.gather_rate = 1;
        resourcesIndex.next_gather_rate = 0;
        // auto gathering
        resourcesIndex.auto_lvl1_res = resourcesIndex.id + '_auto_gather';
        resourcesIndex.auto_lvl1_rate = 0;
        // whole convert div = con_id
        resourcesIndex.con_id = 'conDiv_' + resourcesIndex.id;
        resourcesIndex.con_lbl = 'convert_' + resourcesIndex.id;
        resourcesIndex.con_btn = 'convert_btn_' + resourcesIndex.id;
        resourcesIndex.convert = 10;
        if (resourcesIndex.makes !== 'none') {
            resourcesIndex.convert_mult = 2;
            resourcesIndex.convert_gain = 1;
        }
        resourcesIndex.cnt = 2000;
        resourcesIndex.max = 2000;
        resourcesIndex.res_container = 'res_container_' + resourcesIndex.id;
        resourcesIndex.res_cnt = 'res_cnt_' + resourcesIndex.id;
        resourcesIndex.res_cnt_lbl = 'res_cnt_lbl_' + resourcesIndex.id;
        resourcesIndex.res_cnt_max = 'res_cnt_max_' + resourcesIndex.id;
        const updates = {};
        updates.print_gather = '<button class="button_orange" style="background-color:#000000;">GATHER ' + resourcesIndex.lbl.toUpperCase() + '</button>';
        updates.print_gather2 = '<span class="ltgreentxt">&nbsp;+' + resourcesIndex.gather_rate + ' ' + resourcesIndex.lbl.toUpperCase();
        updates.print_convert = '<button class="button_orange">CONVERT 10 ' + resourcesIndex.lbl + '</button>&nbsp;+1 ' + resourcesIndex.makes.toUpperCase();
        updates.print_convert2 = '<span class="ltred">' + resourcesIndex.cnt + ' / ' + resourcesIndex.convert + ' ' + resourcesIndex.lbl + '</span>';
        // Assign updates to resourcesIndex properties
        Object.assign(resourcesIndex, updates);
    }
*/
    return layoutData;
}

export const layoutData = init_layoutData();