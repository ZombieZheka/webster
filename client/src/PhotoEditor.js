// PhotoEditor.js
import React, { useEffect } from 'react';
//css
import './css/reset.css';
import './css/utility.css';
import './css/component.css';
import './css/layout.css';
import './css/menu.css';
import './css/print.css';
import './../node_modules/alertifyjs/build/css/alertify.min.css';
//js
import app from './js/app.js';
import config from './js/config.js';
import './js/core/components/index.js';
import Base_gui_class from './js/core/base-gui.js';
import Base_layers_class from './js/core/base-layers.js';
import Base_tools_class from './js/core/base-tools.js';
import Base_state_class from './js/core/base-state.js';
import Base_search_class from './js/core/base-search.js';
import File_open_class from './js/modules/file/open.js';
import File_save_class from './js/modules/file/save.js';
import * as Actions from './js/actions/index.js';

var ii = 1;

const PhotoEditor = () => {

    window.addEventListener('load', function (e) {
        if (ii === 1){ii++;}
        else {ii--; return;}
        // Initiate app
        var Layers = new Base_layers_class();
        var Base_tools = new Base_tools_class(true);
        var GUI = new Base_gui_class();
        var Base_state = new Base_state_class();
        var File_open = new File_open_class();
        var File_save = new File_save_class();
        var Base_search = new Base_search_class();
    
        // Register singletons in app module
        app.Actions = Actions;
        app.Config = config;
        app.FileOpen = File_open;
        app.FileSave = File_save;
        app.GUI = GUI;
        app.Layers = Layers;
        app.State = Base_state;
        app.Tools = Base_tools;
    
        // Register as global for quick or external access
        window.Layers = Layers;
        window.AppConfig = config;
        window.State = Base_state;
        window.FileOpen = File_open;
        window.FileSave = File_save;
    
        // Render all
        GUI.init();
        Layers.init();
    }, false);

    return (
        <div className='body-editor'>
        <div className="wrapper">
            <nav aria-label="Main Menu" className="main_menu" id="main_menu"></nav>
            
            <div className="submenu">
                <div className="block attributes" id="action_attributes"></div>
                <button className="undo_button" id="undo_button" type="button">
                    <span className="sr_only">Undo</span>
                </button>
            </div>
            
            <div className="sidebar_left" id="tools_container"></div>

            <div className="middle_area" id="middle_area">
                <canvas className="ruler_left" id="ruler_left"></canvas>
                <canvas className="ruler_top" id="ruler_top"></canvas>

                <div className="main_wrapper" id="main_wrapper">
                    <div className="canvas_wrapper" id="canvas_wrapper">
                        <div id="mouse"></div>
                        <div className="transparent-grid" id="canvas_webster_background"></div>
                        <canvas id="canvas_webster">
                            <div className="trn error">
                                Your browser does not support canvas or JavaScript is not enabled.
                            </div>
                        </canvas>
                    </div>
                </div>
            </div>

            <div className="sidebar_right">
                <div className="colors block">
                    <h2 className="trn toggle" data-target="toggle_colors">Colors</h2>
                    <div className="content" id="toggle_colors"></div>
                </div>
                
                <div className="details block" id="details_base">
                    <h2 className="trn toggle toggle-full" data-target="toggle_details">Layer details</h2>
                    <div className="content details-content" id="toggle_details"></div>
                </div>
                
                <div className="layers block">
                    <h2 className="trn">Layers</h2>
                    <div className="content" id="layers_base"></div>
                </div>
            </div>
            <div className="hidden" id="tmp"></div>
            <div id="popups"></div>
        </div>
        </div>
    );
};

export default PhotoEditor;
