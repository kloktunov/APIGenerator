var UI = {

	currentClassChoose: function (){

		var editColumnsElem = document.getElementsByClassName("editcolumns")[0];
		var editColumnClasses = editColumnsElem.getElementsByClassName("classes")[0];
		var classesList = editColumnClasses.getElementsByClassName("list")[0];
		var chooseClass = classesList.getElementsByClassName("choose")[0];

		if(chooseClass == undefined) return -1;

		var splitRes = chooseClass.id.split('_');

		return { className: splitRes[1] };

	},

	currentMethodChoose: function (){
		var editColumnsElem = document.getElementsByClassName("editcolumns")[0];
		var editColumnMethods = editColumnsElem.getElementsByClassName("methods")[0];
		var methodsList = editColumnMethods.getElementsByClassName("list")[0];
		var chooseMethod = methodsList.getElementsByClassName("choose")[0];

		if(chooseMethod == undefined) return -1;

		var splitRes = chooseMethod.id.split('_');

		return { className: splitRes[1], methodName: splitRes[2] };

	},


	renderClassItem: function (name){
		
		var newItem = document.createElement('div');
		newItem.id = "class_" + name;
		newItem.className = "item";

			var nameNewItem = document.createElement('div');
			nameNewItem.className = "name";
			nameNewItem.innerHTML = name;

			var upBtnNewItem = document.createElement('div');
			upBtnNewItem.className = "up_btn";

			var downBtnNewItem = document.createElement('div');
			downBtnNewItem.className = "down_btn";

			var editBtnNewItem = document.createElement('div');
			editBtnNewItem.className = "edit_btn";


		newItem.appendChild(nameNewItem);
		newItem.appendChild(upBtnNewItem);
		newItem.appendChild(editBtnNewItem);
		newItem.appendChild(downBtnNewItem);

		return newItem;

	},

	renderMethodItem: function (class_name, name){
		
		var newItem = document.createElement('div');
		newItem.id = "method_" + class_name + "_" + name;
		newItem.className = "item";

			var nameNewItem = document.createElement('div');
			nameNewItem.className = "name";
			nameNewItem.innerHTML = name;

			var upBtnNewItem = document.createElement('div');
			upBtnNewItem.className = "up_btn";

			var downBtnNewItem = document.createElement('div');
			downBtnNewItem.className = "down_btn";

			var editBtnNewItem = document.createElement('div');
			editBtnNewItem.className = "edit_btn";


		newItem.appendChild(nameNewItem);
		newItem.appendChild(upBtnNewItem);
		newItem.appendChild(editBtnNewItem);
		newItem.appendChild(downBtnNewItem);

		return newItem;

	},

	renderParamItem: function (class_name, method_name, name){

		var newItem = document.createElement('div');
		newItem.id = "param_" + class_name + "_" + method_name +  "_" + name;
		newItem.className = "item";

			var nameNewItem = document.createElement('div');
			nameNewItem.className = "name";
			nameNewItem.innerHTML = name;

			var upBtnNewItem = document.createElement('div');
			upBtnNewItem.className = "up_btn";

			var downBtnNewItem = document.createElement('div');
			downBtnNewItem.className = "down_btn";

			var editBtnNewItem = document.createElement('div');
			editBtnNewItem.className = "edit_btn";


		newItem.appendChild(nameNewItem);
		newItem.appendChild(upBtnNewItem);
		newItem.appendChild(editBtnNewItem);
		newItem.appendChild(downBtnNewItem);

		return newItem;

	},

	renderParamCondition: function (type, val){

		var newCondItem = document.createElement('div');
		newCondItem.className = "input_pair condition";

			var titleNewCondItem = document.createElement('div');
			titleNewCondItem.className = "title";
			titleNewCondItem.innerHTML = "&nbsp;";

			var inputNewCondItem = document.createElement('div');
			inputNewCondItem.className = "input";

				var selectInputNewCondItem = document.createElement('select');
				selectInputNewCondItem.className = "bottom10 condition_type";


					var optionMinLimitInputNewCondItem = document.createElement('option');
					optionMinLimitInputNewCondItem.value = "min_limit";
					optionMinLimitInputNewCondItem.innerHTML = "Мин. значение";

					var optionMaxLimitInputNewCondItem = document.createElement('option');
					optionMaxLimitInputNewCondItem.value = "max_limit";
					optionMaxLimitInputNewCondItem.innerHTML = "Макс. значение";

					var optionMinLengthInputNewCondItem = document.createElement('option');
					optionMinLengthInputNewCondItem.value = "min_length";
					optionMinLengthInputNewCondItem.innerHTML = "Мин. длина";

					var optionMaxLengthInputNewCondItem = document.createElement('option');
					optionMaxLengthInputNewCondItem.value = "max_length";
					optionMaxLengthInputNewCondItem.innerHTML = "Макс. длина";


				var condValueInputNewCondItem = document.createElement('input');
				condValueInputNewCondItem.className = "condition_value bottom10";
				condValueInputNewCondItem.type = "text";
				condValueInputNewCondItem.placeholder = "Введите значение...";
				condValueInputNewCondItem.value = val;

				var centerInputNewCondItem = document.createElement('center');

					var removeBtnInputNewCondItem = document.createElement('a');
					removeBtnInputNewCondItem.className = "gray remove_condition";
					removeBtnInputNewCondItem.innerHTML = "удалить";
					removeBtnInputNewCondItem.addEventListener('click', function (){
						console.log("remove this - " + newCondItem);
						newCondItem.remove();
					});


		selectInputNewCondItem.appendChild(optionMinLimitInputNewCondItem);
		selectInputNewCondItem.appendChild(optionMaxLimitInputNewCondItem);
		selectInputNewCondItem.appendChild(optionMinLengthInputNewCondItem);
		selectInputNewCondItem.appendChild(optionMaxLengthInputNewCondItem);
		centerInputNewCondItem.appendChild(removeBtnInputNewCondItem);

		selectInputNewCondItem.value = type;

		inputNewCondItem.appendChild(selectInputNewCondItem);
		inputNewCondItem.appendChild(condValueInputNewCondItem);
		inputNewCondItem.appendChild(centerInputNewCondItem);


		newCondItem.appendChild(titleNewCondItem);
		newCondItem.appendChild(inputNewCondItem);

		return newCondItem;
	},

	putClassItem: function (item){
		var classesListDiv = document.getElementsByClassName('classes')[0].getElementsByClassName('list')[0];
		var isEmptyDiv = classesListDiv.getElementsByClassName("is_empty")[0];

		classesListDiv.insertBefore(item, isEmptyDiv);

	},

	putMethodItem: function (item){
		var methodsListDiv = document.getElementsByClassName('methods')[0].getElementsByClassName('list')[0];
		var isEmptyDiv = methodsListDiv.getElementsByClassName("is_empty")[0];

		methodsListDiv.insertBefore(item, isEmptyDiv);

	},

	putParamItem: function (item){
		var paramsListDiv = document.getElementsByClassName('params')[0].getElementsByClassName('list')[0];
		var isEmptyDiv = paramsListDiv.getElementsByClassName("is_empty")[0];

		paramsListDiv.insertBefore(item, isEmptyDiv);
	},

	newProject: function(){

       	APIGenerator.schema.classes = APIGenerator.schema.newProjectClasses;            
		UI.openProject();

	},


	loadProject: function (){

		var fileInput = document.getElementsByClassName('schema_json_file')[0];

		if(fileInput.files.length == 0) return;

		var file = fileInput.files[0];

		var reader = new FileReader();
        reader.onload = function(event) {
        	APIGenerator.schema.classes = JSON.parse(event.target.result).classes;            
			UI.openProject();
        }
        
        reader.readAsText(file);


	},

	openProject: function (){

		UI.closeClassesList();
		UI.closeMethodsList();
		UI.closeParamsList();

		var currentProject = APIGenerator.schema;
		var classesList = currentProject.classes;

		for(var name in classesList){
			var newItem = UI.renderClassItem(name);
			UI.putClassItem(newItem);
      	}

	},

	closeClassesList: function (){
		var classesListDiv = document.getElementsByClassName('classes')[0].getElementsByClassName('list')[0];
		var itemsClassesList = classesListDiv.getElementsByClassName("item");

		for(var i = 0, l = itemsClassesList.length; i < l; i++){
			classesListDiv.removeChild(itemsClassesList[0])
		}
	},


	// name = class_name
	openMethodsList: function (name){

		if(!APIGenerator.classExists(name)){
			alert("Данного класса не существует");
			return;
		}

      	var currentClassItem = UI.currentClassChoose();

		if(currentClassItem.className == name){
			return;
		}

		var methodList = APIGenerator.schema.classes[name].methods;
		
		UI.closeParamsList();
		UI.closeMethodsList();

		for(var method_name in methodList){
			var newItem = UI.renderMethodItem(name, method_name);
			UI.putMethodItem(newItem);
      	}

      	if(currentClassItem == -1){}
      	else {
      		document.getElementById("class_" + currentClassItem.className).className = "item";
      	}

      	document.getElementById("class_" + name).className = "item choose";

	},

	closeMethodsList: function (){
		var methodsListDiv = document.getElementsByClassName('methods')[0].getElementsByClassName('list')[0];
		var itemsMethodsList = methodsListDiv.getElementsByClassName("item");

		for(var i = 0, l = itemsMethodsList.length; i < l; i++){
			methodsListDiv.removeChild(itemsMethodsList[0])
		}
	},

	// name = method_name
	openParamsList: function (class_name, name){

		if(!APIGenerator.methodExists(class_name, name)){
			alert("Данного класса не существует");
			return;
		}

		var paramsList = APIGenerator.schema.classes[class_name].methods[name].params;
		
		UI.closeParamsList();

		for(var param_name in paramsList){
			var newItem = UI.renderParamItem(class_name, name, param_name);
			UI.putParamItem(newItem);
      	}

      	var currentMethodItem = UI.currentMethodChoose();

      	if(currentMethodItem == -1){}
      	else {
      		document.getElementById("method_" + currentMethodItem.className + "_" + currentMethodItem.methodName).className = "item";
      	}

      	document.getElementById("method_" + class_name + "_" + name).className = "item choose";
	
	},

	closeParamsList: function (){
		var paramsListDiv = document.getElementsByClassName('params')[0].getElementsByClassName('list')[0];
		var itemsParamsList = paramsListDiv.getElementsByClassName("item");

		for(var i = 0, l = itemsParamsList.length; i < l; i++){
			paramsListDiv.removeChild(itemsParamsList[0])
		}
	},


	onClassAdd: function (name){

		// 1. Проверяем наличие такого класса
		// 2. Создаем UI элемент
		// 3. Добавляем в список

		if(!APIGenerator.classExists(name)){
			alert("Данного класса не существует");
			return;
		}


		var newItem = UI.renderClassItem(name);

		UI.putClassItem(newItem);

	},

	onClassChange: function (old_name, name) {

		if(old_name == name){
			return;
		}

		if(!APIGenerator.classExists(name)){
			alert("Данного класса не существует");
			return;
		}

		var itemClass = document.getElementById("class_" + old_name);
		var itemClassName = itemClass.getElementsByClassName('name')[0];
		itemClass.id = "class_" + name;
		itemClassName.innerHTML = name;

		if(UI.currentClassChoose().className == name){
			UI.closeParamsList();
			UI.closeMethodsList();

			itemClass.className = "item";
		}

	},

	onClassRemove: function (name){

		if(UI.currentClassChoose().className == name){
			UI.closeParamsList();
			UI.closeMethodsList();
		}

		var itemClass = document.getElementById("class_" + name);
		itemClass.remove();

	},

	onMethodAdd: function (class_name, name){

		if(!APIGenerator.methodExists(class_name, name)){
			alert("Данного метода не существует");
			return;
		}

		if(UI.currentClassChoose().className !== class_name){
			return;
		}


		var newItem = UI.renderMethodItem(class_name, name);

		UI.putMethodItem(newItem);

	},

	onMethodChange: function (old_name, class_name, name){

		if(old_name == name){
			return;
		}

		if(!APIGenerator.methodExists(class_name, name)){
			alert("Данного класса не существует");
			return;
		}


		var itemMethod = document.getElementById("method_"  + class_name + "_" + old_name);
		var itemMethodName = itemMethod.getElementsByClassName('name')[0];
		itemMethod.id = "method_"  + class_name + "_" + name;
		itemMethodName.innerHTML = name;

		if(UI.currentMethodChoose().className == class_name && UI.currentMethodChoose().methodName == name){
			UI.closeParamsList();

			itemMethod.className = "item";
		}


	},

	onMethodRemove: function (class_name, name){

		if(UI.currentMethodChoose().className == class_name && UI.currentMethodChoose().methodName == name){
			UI.closeParamsList();
		}

		var itemMethod = document.getElementById("method_" + class_name + "_" + name);
		itemMethod.remove();

	},

	onParamAdd: function (class_name, method_name, name){

		if(!APIGenerator.paramExists(class_name, method_name, name)){
			alert("Данного параметра не существует");
			return;
		}

		if(!(UI.currentMethodChoose().className == class_name && UI.currentMethodChoose().methodName == method_name)){
			return;
		}


		var newItem = UI.renderParamItem(class_name, method_name, name);

		UI.putParamItem(newItem);

	},

	onParamChange: function (old_name, class_name, method_name, name){
		if(old_name == name){
			return;
		}

		if(!APIGenerator.paramExists(class_name, method_name, name)){
			alert("Данного метода не существует");
			return;
		}


		var itemParam = document.getElementById("param_"  + class_name + "_" + method_name + "_" + old_name);
		var itemParamName = itemParam.getElementsByClassName('name')[0];
		itemParam.id = "param_"  + class_name + "_" + method_name + "_"  + name;
		itemParamName.innerHTML = name;

	},

	onParamRemove: function (class_name, method_name, name){

		var itemParam = document.getElementById("param_" + class_name + "_" + method_name + "_" + name);
		itemParam.remove();

	},


	// open methods

	editClass: function (name){

		// 1. Берем данные из схемы API
		// 2. Открываем окно редактирования
		// 3. Заполняем все поля

		if(!APIGenerator.classExists(name)){
			alert("Не найден класс");
			return;
		}

		
		var editColumnsElem = document.getElementsByClassName("editcolumns")[0];
		var editWindowsElem = document.getElementsByClassName("editwindows")[0];
		var editWindowClassesElem = editWindowsElem.getElementsByClassName("classes")[0];

		editColumnsElem.classList.add('hidden');
		editWindowsElem.classList.remove('hidden');
		editWindowClassesElem.classList.remove('hidden');

		var inputName = editWindowClassesElem.getElementsByClassName('class_name')[0];
		var inputDescription = editWindowClassesElem.getElementsByClassName('class_description')[0];
		var inputHiddenClass = editWindowClassesElem.getElementsByClassName('edit_class_name')[0];

		var classData = APIGenerator.schema.classes[name];

		inputName.value = classData.name;
		inputDescription.value = classData.description;

		inputHiddenClass.value = classData.name;

		inputName.focus();

	},

	editMethod: function (class_name, name){

		if(!APIGenerator.classExists(class_name)){
			alert("Не найден класс");
			return;
		}

		if(!APIGenerator.methodExists(class_name, name)){
			alert("Не найден  метод");
			return;
		}

		console.log(class_name + " " + name);

		var editColumnsElem = document.getElementsByClassName("editcolumns")[0];
		var editWindowsElem = document.getElementsByClassName("editwindows")[0];
		var editWindowMethodsElem = editWindowsElem.getElementsByClassName("methods")[0];

		editColumnsElem.classList.add('hidden');
		editWindowsElem.classList.remove('hidden');
		editWindowMethodsElem.classList.remove('hidden');

		var inputName = editWindowMethodsElem.getElementsByClassName('method_name')[0];
		var inputDescription = editWindowMethodsElem.getElementsByClassName('method_description')[0];
		var checkboxIsAuth = document.getElementById('checkbox_is_auth');
		var checkboxIsAdmin = document.getElementById('checkbox_is_admin');
		var checkboxIsDB = document.getElementById('checkbox_is_db');

		var inputHiddenClass = editWindowMethodsElem.getElementsByClassName('edit_class_name')[0];
		var inputHiddenMethod = editWindowMethodsElem.getElementsByClassName('edit_method_name')[0];

		var classData = APIGenerator.schema.classes[class_name];
		var methodData = classData.methods[name];

		inputName.value = methodData.name;
		inputDescription.value = methodData.description;
		checkboxIsAuth.checked = methodData.is_auth;
		checkboxIsAdmin.checked = methodData.is_admin;
		checkboxIsDB.checked = methodData.is_db;
		
		inputHiddenClass.value = classData.name;
		inputHiddenMethod.value = methodData.name;

		inputName.focus();


	},

	editParam: function (class_name, method_name, name){

		if(!APIGenerator.classExists(class_name)){
			alert("Не найден класс");
			return;
		}

		if(!APIGenerator.methodExists(class_name, method_name)){
			alert("Не найден метод");
			return;
		}

		if(!APIGenerator.paramExists(class_name, method_name, name)){
			alert("Не найден параметр");
			return;
		}

		var editColumnsElem = document.getElementsByClassName("editcolumns")[0];
		var editWindowsElem = document.getElementsByClassName("editwindows")[0];
		var editWindowParamsElem = editWindowsElem.getElementsByClassName("params")[0];

		editColumnsElem.classList.add('hidden');
		editWindowsElem.classList.remove('hidden');
		editWindowParamsElem.classList.remove('hidden');

		var oldCondArray = editWindowParamsElem.getElementsByClassName('condition')
		for(var i = 0, length = oldCondArray.length; i < length; i++){
			editWindowParamsElem.removeChild(oldCondArray[0]);
		}

		var inputName = editWindowParamsElem.getElementsByClassName('param_name')[0];
		var inputDescription = editWindowParamsElem.getElementsByClassName('param_description')[0];
		var selectType = editWindowParamsElem.getElementsByClassName('param_type')[0];
		var checkboxOptional = document.getElementById('checkbox_optional');
		var ipCreateCondition = editWindowParamsElem.getElementsByClassName('condition_create_btn')[0];

		var inputHiddenClass = editWindowParamsElem.getElementsByClassName('edit_class_name')[0];
		var inputHiddenMethod = editWindowParamsElem.getElementsByClassName('edit_method_name')[0];
		var inputHiddenParam = editWindowParamsElem.getElementsByClassName('edit_param_name')[0];

		var classData = APIGenerator.schema.classes[class_name];
		var methodData = classData.methods[method_name];
		var paramData = methodData.params[name];

		inputName.value = paramData.name;
		inputDescription.value = paramData.description;
		selectType.value = paramData.type;
		checkboxOptional.checked = paramData.optional;

		for(i in paramData.conditions){
			var cond = paramData.conditions[i];

			var cond_type = cond.type;
			switch(cond.type){
				case 'min_limit':
					cond_value = cond.min;
				break;
				case 'max_limit':
					cond_value = cond.max;
				break;
				case 'min_length':
					cond_value = cond.min;
				break;
				case 'max_length':
					cond_value = cond.max;
				break;
				default:
					console.log(cond_type + ": not valid");
					continue;
				break;
			}

			var condView = UI.renderParamCondition(cond_type, cond_value);
			editWindowParamsElem.insertBefore(condView, ipCreateCondition);

		}
		
		inputHiddenClass.value = classData.name;
		inputHiddenMethod.value = methodData.name;
		inputHiddenParam.value = paramData.name;

		inputName.focus();

	},

	saveClass: function (){
		// 1. Берем данные из формы
		// 2. Передаем их в APIGenerator.editClass

		var editWindowsElem = document.getElementsByClassName("editwindows")[0];
		var editWindowClassesElem = editWindowsElem.getElementsByClassName("classes")[0];

		var inputName = editWindowClassesElem.getElementsByClassName('class_name')[0];
		var inputDescription = editWindowClassesElem.getElementsByClassName('class_description')[0];
		var inputHiddenClass = editWindowClassesElem.getElementsByClassName('edit_class_name')[0];

		var oldClassName = inputHiddenClass.value;
		var newClassName = inputName.value;
		var newClassDescription = inputDescription.value;

		inputHiddenClass.value = newClassName;

		APIGenerator.editClass(oldClassName, newClassName, newClassDescription);

		UI.closeEditWindow();

	},

	saveMethod: function (){
		// 1. Берем данные из формы
		// 2. Передаем их в APIGenerator.editMethod

		var editWindowsElem = document.getElementsByClassName("editwindows")[0];
		var editWindowMethodsElem = editWindowsElem.getElementsByClassName("methods")[0];

		var inputName = editWindowMethodsElem.getElementsByClassName('method_name')[0];
		var inputDescription = editWindowMethodsElem.getElementsByClassName('method_description')[0];
		var checkboxIsAuth = document.getElementById('checkbox_is_auth');
		var checkboxIsAdmin = document.getElementById('checkbox_is_admin');
		var checkboxIsDB = document.getElementById('checkbox_is_db');

		var inputHiddenClass = editWindowMethodsElem.getElementsByClassName('edit_class_name')[0];
		var inputHiddenMethod = editWindowMethodsElem.getElementsByClassName('edit_method_name')[0];

		var oldMethodName = inputHiddenMethod.value;
		var className = inputHiddenClass.value;
		var newMethodName = inputName.value;
		var newMethodDescription = inputDescription.value;
		var newIsAuth = checkboxIsAuth.checked;
		var newIsAdmin = checkboxIsAdmin.checked;
		var newIsDB = checkboxIsDB.checked;

		inputHiddenMethod.value = newMethodName;

		APIGenerator.editMethod(oldMethodName, className, newMethodName, newMethodDescription, newIsAuth, newIsAdmin, newIsDB);

		UI.closeEditWindow();

	},

	saveParam: function (){
		// 1. Берем данные из формы
		// 2. Передаем их в APIGenerator.editParam

		var editWindowsElem = document.getElementsByClassName("editwindows")[0];
		var editWindowParamsElem = editWindowsElem.getElementsByClassName("params")[0];

		var inputName = editWindowParamsElem.getElementsByClassName('param_name')[0];
		var inputDescription = editWindowParamsElem.getElementsByClassName('param_description')[0];
		var selectType = editWindowParamsElem.getElementsByClassName('param_type')[0];
		var checkboxOptional = document.getElementById('checkbox_optional');

		var conditions = document.getElementsByClassName('condition');

		var inputHiddenClass = editWindowParamsElem.getElementsByClassName('edit_class_name')[0];
		var inputHiddenMethod = editWindowParamsElem.getElementsByClassName('edit_method_name')[0];
		var inputHiddenParam = editWindowParamsElem.getElementsByClassName('edit_param_name')[0];

		var oldParamName = inputHiddenParam.value;
		var className = inputHiddenClass.value;
		var methodName = inputHiddenMethod.value;
		var newParamName = inputName.value;
		var newParamDescription = inputDescription.value;
		var newParamType = selectType.value;
		var newParamOptional = checkboxOptional.checked;
		var newConditions = [];

		for(var i = 0, length = conditions.length; i < length; i++){

			var condition = conditions[i];
			var condition_type = condition.getElementsByClassName('condition_type')[0].value;
			var condition_value = condition.getElementsByClassName('condition_value')[0].value;

			var cond_obj = {
				type: condition_type
			};

			switch(condition_type){
				case 'min_limit':
					cond_obj['min'] = parseInt(condition_value);

					if(cond_obj['min'] == NaN) continue;
				break;
				case 'max_limit':
					cond_obj['max'] = parseInt(condition_value);

					if(cond_obj['max'] == NaN) continue;
				break;
				case 'min_length':
					cond_obj['min'] = parseInt(condition_value);

					if(cond_obj['min'] == NaN) continue;
				break;
				case 'max_length':
					cond_obj['max'] = parseInt(condition_value);

					if(cond_obj['max'] == NaN) continue;
				break;
				default:
					console.log(condition_type + ": not valid");
					continue;
				break;
			}


			newConditions.push(cond_obj);

		}

		inputHiddenParam.value = newParamName;

		APIGenerator.editParam(oldParamName, className, methodName, newParamName, newParamDescription, newParamType, newParamOptional, newConditions);

		UI.closeEditWindow();

	},

	removeClass: function (){
		var editWindowsElem = document.getElementsByClassName("editwindows")[0];
		var editWindowClassesElem = editWindowsElem.getElementsByClassName("classes")[0];

		var inputHiddenClass = editWindowClassesElem.getElementsByClassName('edit_class_name')[0];

		var className = inputHiddenClass.value;

		APIGenerator.removeClass(className);

		UI.closeEditWindow();

	},

	removeMethod: function (){

		var editWindowsElem = document.getElementsByClassName("editwindows")[0];
		var editWindowMethodsElem = editWindowsElem.getElementsByClassName("methods")[0];

		var inputHiddenClass = editWindowMethodsElem.getElementsByClassName('edit_class_name')[0];
		var inputHiddenMethod = editWindowMethodsElem.getElementsByClassName('edit_method_name')[0];

		var className = inputHiddenClass.value;
		var methodName = inputHiddenMethod.value;
		
		APIGenerator.removeMethod(className, methodName);

		UI.closeEditWindow();

	},

	removeParam: function (){

		var editWindowsElem = document.getElementsByClassName("editwindows")[0];
		var editWindowParamsElem = editWindowsElem.getElementsByClassName("params")[0];

		var inputHiddenClass = editWindowParamsElem.getElementsByClassName('edit_class_name')[0];
		var inputHiddenMethod = editWindowParamsElem.getElementsByClassName('edit_method_name')[0];
		var inputHiddenParam = editWindowParamsElem.getElementsByClassName('edit_param_name')[0];

		var className = inputHiddenClass.value;
		var methodName = inputHiddenMethod.value;
		var paramName = inputHiddenParam.value;

		APIGenerator.removeParam(className, methodName, paramName);

		UI.closeEditWindow();
	},


	closeEditWindow: function (){

		$('.editwindows .editwindow:not(.hidden)').addClass('hidden');
		$('.editwindows').addClass('hidden');
		$('.editcolumns').removeClass('hidden');

	},

	classMoveTo: function (class_name, vector){
		if(!APIGenerator.moveClassTo(class_name, vector)){
			return;
		}

		var list = $('.editcolumns .editcolumn.classes .list');
		var classNode = $('.editcolumns .editcolumn.classes .list #class_' + class_name);
		var classPos = classNode.index();

		var new_pos = classPos;

		if(vector == "up"){
			new_pos--;
			classNode.insertBefore(list.children()[new_pos]);
		}
		else {
			new_pos++;
			classNode.insertAfter(list.children()[new_pos]);
		}


	},

	methodMoveTo: function (class_name, method_name, vector){
		if(!APIGenerator.moveMethodTo(class_name, method_name, vector)){
			return;
		}

		var list = $('.editcolumns .editcolumn.methods .list');
		var methodNode = $('.editcolumns .editcolumn.methods .list #method_' + class_name + '_' + method_name);
		var methodPos = methodNode.index();

		var new_pos = methodPos;

		if(vector == "up"){
			new_pos--;
			methodNode.insertBefore(list.children()[new_pos]);
		}
		else {
			new_pos++;
			methodNode.insertAfter(list.children()[new_pos]);
		}


	},

	paramMoveTo: function (class_name, method_name, param_name, vector){
		if(!APIGenerator.moveParamTo(class_name, method_name, param_name, vector)){
			return;
		}

		var list = $('.editcolumns .editcolumn.params .list');
		var paramNode = $('.editcolumns .editcolumn.params .list #param_' + class_name + '_' + method_name + '_' + param_name);
		var paramPos = paramNode.index();

		var new_pos = paramPos;

		if(vector == "up"){
			new_pos--;
			paramNode.insertBefore(list.children()[new_pos]);
		}
		else {
			new_pos++;
			paramNode.insertAfter(list.children()[new_pos]);
		}

	}

};


$(document).ready(function() {


	// 1. Загрузить проект, если он есть в cookie
	// 2. Формирование списка классов из базы
	// 3. Повесить все события

	$('.editcolumns .editcolumn.classes .list').delegate('.item', 'click', function (e){
		var className = $(this)[0];

		var pClassName = className.id.split('_')[1];

		UI.openMethodsList(pClassName);
	});

	$('.editcolumns .editcolumn.methods .list').delegate('.item', 'click', function (e){
		var className = $(this)[0];

		var pClassName = className.id.split('_')[1];
		var pMethodName = className.id.split('_')[2];

		UI.openParamsList(pClassName, pMethodName);
	});

	$('.editcolumns .editcolumn.classes .list').delegate('.item .edit_btn', 'click', function (e){
		var className = $(e.target).parent()[0];

		var pClassName = className.id.split('_')[1];

		UI.editClass(pClassName);
	});

	$('.editcolumns .editcolumn.methods .list').delegate('.item .edit_btn', 'click', function (e){
		var className = $(e.target).parent()[0];

		var pClassName = className.id.split('_')[1];
		var pMethodName = className.id.split('_')[2];

		UI.editMethod(pClassName, pMethodName);
	});

	$('.editcolumns .editcolumn.params .list').delegate('.item .edit_btn', 'click', function (e){
		var className = $(e.target).parent()[0];

		var pClassName = className.id.split('_')[1];
		var pMethodName = className.id.split('_')[2];
		var pParamName = className.id.replace('param_' + pClassName + '_' + pMethodName + '_', '');

		console.log(pClassName + " " + pMethodName + " " + pParamName);

		UI.editParam(pClassName, pMethodName, pParamName);
	});

	$('.editcolumns .editcolumn.classes .list').delegate('.item .up_btn', 'click', function (e){
		var className = $(e.target).parent()[0];

		var pClassName = className.id.split('_')[1];

		UI.classMoveTo(pClassName, "up");

		return false;
	});

	$('.editcolumns .editcolumn.methods .list').delegate('.item .up_btn', 'click', function (e){
		var className = $(e.target).parent()[0];

		var pClassName = className.id.split('_')[1];
		var pMethodName = className.id.split('_')[2];

		UI.methodMoveTo(pClassName, pMethodName, "up");

		return false;
	});

	$('.editcolumns .editcolumn.params .list').delegate('.item .up_btn', 'click', function (e){
		var className = $(e.target).parent()[0];

		var pClassName = className.id.split('_')[1];
		var pMethodName = className.id.split('_')[2];
		var pParamName = className.id.replace('param_' + pClassName + '_' + pMethodName + '_', '');

		console.log(pClassName + " " + pMethodName + " " + pParamName);

		UI.paramMoveTo(pClassName, pMethodName, pParamName, "up");

		return false;
	});

	$('.editcolumns .editcolumn.classes .list').delegate('.item .down_btn', 'click', function (e){
		var className = $(e.target).parent()[0];

		var pClassName = className.id.split('_')[1];

		UI.classMoveTo(pClassName, "down");

		return false;
	});

	$('.editcolumns .editcolumn.methods .list').delegate('.item .down_btn', 'click', function (e){
		var className = $(e.target).parent()[0];

		var pClassName = className.id.split('_')[1];
		var pMethodName = className.id.split('_')[2];

		UI.methodMoveTo(pClassName, pMethodName, "down");

		return false;
	});

	$('.editcolumns .editcolumn.params .list').delegate('.item .down_btn', 'click', function (e){
		var className = $(e.target).parent()[0];

		var pClassName = className.id.split('_')[1];
		var pMethodName = className.id.split('_')[2];
		var pParamName = className.id.replace('param_' + pClassName + '_' + pMethodName + '_', '');

		console.log(pClassName + " " + pMethodName + " " + pParamName);

		UI.paramMoveTo(pClassName, pMethodName, pParamName, "down");

		return false;
	});

	$('.editcolumns .create_btn.class').on('click', function (e){

		var classesCount = Object.keys(APIGenerator.schema.classes).length;

		APIGenerator.addClass("newClass" + classesCount, "newDescription");
	});

	$('.editcolumns .create_btn.method').on('click', function (e){
		var class_name = UI.currentClassChoose().className;

		var methodsCount = Object.keys(APIGenerator.schema.classes[class_name].methods).length;

		APIGenerator.addMethod(class_name, "newMethod" + methodsCount, "newDescription", false, false, false);
	});

	$('.editcolumns .create_btn.param').on('click', function (e){

		var class_name = UI.currentMethodChoose().className;
		var method_name = UI.currentMethodChoose().methodName;

		var paramsCount = Object.keys(APIGenerator.schema.classes[class_name].methods[method_name].params).length;

		APIGenerator.addParam(class_name, method_name, "newParam" + paramsCount, "newDescription", 1, false, []);
	});

	$('.editwindows .close_btn').on('click', function (e){

		UI.closeEditWindow();
	});


	$('.editwindows .editwindow.classes .save_btn').on('click', UI.saveClass);
	$('.editwindows .editwindow.methods .save_btn').on('click', UI.saveMethod);
	$('.editwindows .editwindow.params .save_btn').on('click', UI.saveParam);

	$('.editwindows .editwindow.classes .delete_btn').on('click', function (e){

		UI.removeClass();

	});

	$('.editwindows .editwindow.methods .delete_btn').on('click', function (e){

		UI.removeMethod();

	});

	$('.editwindows .editwindow.params .delete_btn').on('click', function(e){

		UI.removeParam();

	});

	$('.editwindows .editwindow.params .condition_create_btn .add_condition').on('click', function(e){

		console.log(1);

		var mParent = $('.editwindows .editwindow.params')[0];
		var ipConditionCreateBtn = $('.editwindows .editwindow.params .condition_create_btn')[0];

		var newCondition = UI.renderParamCondition("min_limit", "");

		mParent.insertBefore(newCondition, ipConditionCreateBtn);

	});


	$('.editwindows .editwindow.params .condition .remove_condition').on('click', function(e){

		UI.removeCondition(e);

	});

	$('.navbar .buttons .load_project').on('click', UI.loadProject);
	$('.navbar .buttons .new_project').on('click', UI.newProject);
	$('.navbar .buttons .save_project').on('click', APIGenerator.schema.saveProject);

});