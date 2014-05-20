/*******************************************************************************
 * The MIT License (MIT)
 *
 * Copyright (c) 2011, 2013 OpenWorm.
 * http://openworm.org
 *
 * All rights reserved. This program and the accompanying materials
 * are made available under the terms of the MIT License
 * which accompanies this distribution, and is available at
 * http://opensource.org/licenses/MIT
 *
 * Contributors:
 *      OpenWorm - http://openworm.org/people.html
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
 * IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
 * DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
 * OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
 * USE OR OTHER DEALINGS IN THE SOFTWARE.
 *******************************************************************************/
/**
 * Controller class for popup widget. Use to make calls to widget from inside Geppetto.
 *
 * @constructor
 *
 * @author Jesus R Martinez (jesus@metacell.us)
 */
define(function(require) {
	return function(GEPPETTO) {

		var Popup = require('widgets/popup/Popup');
		var popups = new Array();

		GEPPETTO.PopupsController = {
			

			/**
			 * Registers widget events to detect and execute following actions.
			 * Used when widget is destroyed.
			 *
			 * @param plotID
			 */
			registerHandler: function(popupID) {
				GEPPETTO.WidgetsListener.subscribe(GEPPETTO.PopupsController, popupID);
			},
			
			addPopupWidget : function(){
				//Popup widget number
				var index = (popups.length + 1);

				//Name of popup widget
				var name = "Popup" + index;
				var id = name;

				//create popup widget
				var p = window[name] = new Popup({id:id, name:name,visible:false});

				//create help command for plot
				p.help = function(){return GEPPETTO.Utility.getObjectCommands(id);};

				//store in local stack
				popups.push(p);
				
				this.registerHandler(id);

				//add commands to console autocomplete and help option
				GEPPETTO.Utility.updateCommands("js/widgets/popup/Popup.js", p, id);

				return p;
			},
		
			removePopupWidgets : function(){
				//remove all existing popup widgets
				for(var i = 0; i < popups.length; i++) {
					var popup = popups[i];

					popup.destroy();
					i++;
				}

				popups = new Array();
			},
			
			//receives updates from widget listener class to update plotting widget(s)
			update: function(event) {
				//delete popup widget(s)
				if(event == GEPPETTO.WidgetsListener.WIDGET_EVENT_TYPE.DELETE) {
					this.removePopupWidgets();
				}
			}
		};
		
	};
});