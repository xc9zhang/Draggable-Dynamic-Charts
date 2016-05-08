# Draggable-Dynamic-Charts

User interface with draggable charts, continuously refreshes data and displays it for the selected date. Customize your own layout, saveable and reloadable.

Built using angular-drag-and-drop-lists and Angular Chart.js. See here: https://github.com/marceljuenemann/angular-drag-and-drop-lists
http://jtblin.github.io/angular-chart.js/

First include these in BundleConfig:
()

Index.cshtml

- Top script makes the chart elements draggable with the dnd-directives.
- The Save and Loadout buttons use the save_layout() and load_layout methods defined in controller.js
- For each template, make the appropriate changes for your application : id, nvd3 tags and chart labels

Controller.js

- Keep this line: $scope.load_layout();
The application loads the last saved layout upon start.
- Charts templates and default dropzones are defined under $scope.models. Make the appropriate changes for your application.
- save_layout() and load_layout() methods return prompts made by toast.js
see here: https://github.com/CodeSeven/toastr
Templates are passed in and saved into or fetched from the server.
- Chart models use Angular Chart.js. 
- Change the chart labels and definitions.
