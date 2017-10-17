window.onbeforeunload = function(e) {
  var dialogText = 'Dialog text here';
  e.returnValue = dialogText;
  return dialogText;
};

var APIGenerator = {

	paramTypes: ['int', 'string'],

	schema: {

		/*
			0 - сохранен
			1 - изменен, но не сохранен
		*/

		status: 0,

		saveProject: function (){

			// 1. Загружаем данные на сервер
			// 2. Меняем статус
			// 3. Снимаем событие

			APIGenerator.schema.status  = 0;

			var saveObject = {
				classes: APIGenerator.schema.classes
			};

			var saveObjectStr = JSON.stringify(saveObject);

			var a = document.createElement("a");
		    var file = new Blob([saveObjectStr], {type: "application/json"});
		    a.href = URL.createObjectURL(file);
		    a.download = "schema.json";
		    a.click();

		},

		project: {
			id: 1,
			name: "Тестовый проект",
			version: 0.1,
			changeVersion: 144023234,
			description: "Проект создан для тестирования новой платформы" 
		},

		newProjectClasses: {"api":{"name":"api","description":"Класс содержит методы для получения информации об текущем API","methods":{"version":{"name":"version","description":"Получает информацию о версии текущего API","is_auth":false,"is_admin":false,"is_db":false,"params":{}}}},"accounts":{"name":"accounts","description":"Класс содержит методы для работы с аккаунтом","methods":{"get":{"name":"get","description":"Получает информацию об аккаунте","is_auth":true,"is_admin":false,"is_db":true,"params":{}}}},"auth":{"name":"auth","description":"Класс содержит в себе методы для работы с авторизацией","methods":{"login":{"name":"login","description":"Метод для авторизации пользователя","is_auth":false,"is_admin":false,"is_db":true,"params":{"login":{"name":"login","description":"Логин входа","type":"2","optional":false,"conditions":[]},"password":{"name":"password","description":"Пароль для входа","type":"2","optional":false,"conditions":[]}}}}},"apps":{"name":"apps","description":"Класс для работы с методами приложений","methods":{}}},


		classes: { }

	},

	// Классы для проверок наличия классов, методов и переменных

	classExists: function (name){
		return (APIGenerator.schema.classes[name] != undefined);
	},

	methodExists: function (class_name, name){
		return (APIGenerator.classExists(class_name) && APIGenerator.schema.classes[class_name].methods[name] != undefined);
	},

	paramExists: function (class_name, method_name, name){
		return (APIGenerator.classExists(class_name) && APIGenerator.methodExists(class_name, method_name) && (APIGenerator.schema.classes[class_name].methods[method_name].params[name] != undefined));
	},

	classTestName: function(name){
		var patternName = new RegExp("^[a-zA-Z0-9]+$");
		return patternName.test(name); // true = имя подходит, false = имя не подходит
	},

	methodTestName: function(name){
		var patternName = new RegExp("^[a-zA-Z0-9]+$");
		return patternName.test(name); // true = имя подходит, false = имя не подходит
	},

	paramTestName: function(name){
		var patternName = new RegExp("^[a-zA-Z0-9_]+$");
		return patternName.test(name); // true = имя подходит, false = имя не подходит
	},



	// Классы для добавление, редактирования и удаление данных

	addClass: function (name, description){
		// 1. Проверяем наличие такого класса
		// 2. Проверяем синтаксис
		// 3. Добавляем классы


		if(APIGenerator.classExists(name)){
			alert("Данный класс уже существует");
			return;
		}	
		
		if(!APIGenerator.classTestName(name)){
			alert("Некорректное имя класса");
			return;
		}

		APIGenerator.schema.classes[name] = {
			name: name,
			description: description,

			methods: {

			}
		};

		UI.onClassAdd(name);
	},

	addMethod: function (class_name, name, description, is_auth, is_admin, is_db){
		// 1. Проверяем наличие такого класса
		// 2. Проверяем наличие метода
		// 3. Проверяем синтаксис
		// 4. Формируем JSON объект
		// 5. Добавляем описание
		// 6. Добавляем все флаги
		// 7. Добавляем объект в схему
		// 8. Обновляем UI

		if(APIGenerator.methodExists(class_name, name)){
			alert("Данный метод уже существует");
			return;
		}

		if(!APIGenerator.methodTestName(name)){
			alert("Некорректное имя метода");
			return;
		}


		APIGenerator.schema.classes[class_name].methods[name] = {

			name: name,
			description: description,
			is_auth: is_auth,
			is_admin: is_admin,
			is_db: is_db,

			params: {

			}

		};

		UI.onMethodAdd(class_name, name);
	},

	addParam: function (class_name, method_name, name, description, type,  optional, conditions){
		// 1. Проверяем наличие такого класса
		// 2. Проверяем наличие метода
		// 2. Проверяем наличие переменной
		// 3. Проверяем синтаксис
		// 4. Формируем JSON объект
		// 5. Добавляем описание
		// 6. Добавляем все флаги
		// 7. Добавляем объект в схему
		// 8. Обновляем UI

		if(APIGenerator.paramExists(class_name, method_name, name)){
			alert("Данноле поле уже существует");
			return;
		}

		if(!APIGenerator.paramTestName(name)){
			alert("Некорректное имя параметра");
			return;
		}

		APIGenerator.schema.classes[class_name].methods[method_name].params[name] = {

			name: name,
			description: description,
			type: type,
			optional: optional,
			conditions: conditions

		};


		UI.onParamAdd(class_name, method_name, name);

	},

	editClass: function (old_name, name, description){
		// 1. Проверяем наличие такого класса
		// 2. Проверяем синтаксис
		// 3. Формируем JSON объект
		// 4. Добавляем описание
		// 5. Добавляем все флаги
		// 6. Добавляем объект в схему
		// 7. Обновляем UI

		if(!APIGenerator.classExists(old_name)){
			alert("Данного класса не существует");
			return;
		}


		if(old_name !== name){

			if(!APIGenerator.classTestName(name)){
				alert("Некорректное имя класса");
				return;
			}

			APIGenerator.schema.classes[name] = APIGenerator.schema.classes[old_name];
			delete APIGenerator.schema.classes[old_name];
		}

		APIGenerator.schema.classes[name].name = name;
		APIGenerator.schema.classes[name].description = description;

		UI.onClassChange(old_name, name);

	},

	editMethod: function  (old_name, class_name, name, description, is_auth, is_admin, is_db){
		// 1. Проверяем наличие такого класса
		// 2. Проверяем наличие метода
		// 3. Проверяем синтаксис
		// 4. Формируем JSON объект
		// 5. Добавляем описание
		// 6. Добавляем все флаги
		// 7. Добавляем объект в схему
		// 8. Обновляем UI

		if(!APIGenerator.methodExists(class_name, old_name)){
			alert("Данного метода не существует");
			return;
		}


		if(old_name !== name){

			if(!APIGenerator.methodTestName(name)){
				alert("Некорректное имя метода");
				return;
			}

			APIGenerator.schema.classes[class_name].methods[name] = APIGenerator.schema.classes[class_name].methods[old_name];
			delete APIGenerator.schema.classes[class_name].methods[old_name];
		}

		APIGenerator.schema.classes[class_name].methods[name].name = name;
		APIGenerator.schema.classes[class_name].methods[name].description = description;
		APIGenerator.schema.classes[class_name].methods[name].is_auth = is_auth;
		APIGenerator.schema.classes[class_name].methods[name].is_admin = is_admin;
		APIGenerator.schema.classes[class_name].methods[name].is_db = is_db;

		UI.onMethodChange(old_name, class_name, name);


	},

	editParam: function (old_name, class_name, method_name, name, description, type, optional, conditions){
		// 1. Проверяем наличие такого класса
		// 2. Проверяем наличие метода
		// 3. Проверяем синтаксис
		// 4. Формируем JSON объект
		// 5. Добавляем описание
		// 6. Добавляем все флаги
		// 7. Добавляем объект в схему
		// 8. Обновляем UI

		if(!APIGenerator.paramExists(class_name, method_name, old_name)){
			alert("Данного параметра не существует");
			return;
		}

		if(old_name !== name){
			if(!APIGenerator.paramTestName(name)){
				alert("Некорректное имя параметра");
				return;
			}

			APIGenerator.schema.classes[class_name].methods[method_name].params[name] = APIGenerator.schema.classes[class_name].methods[method_name].params[old_name];
			delete APIGenerator.schema.classes[class_name].methods[method_name].params[old_name];

		}

		APIGenerator.schema.classes[class_name].methods[method_name].params[name].name = name;
		APIGenerator.schema.classes[class_name].methods[method_name].params[name].description = description;
		APIGenerator.schema.classes[class_name].methods[method_name].params[name].type = type;
		APIGenerator.schema.classes[class_name].methods[method_name].params[name].optional = optional;
		APIGenerator.schema.classes[class_name].methods[method_name].params[name].conditions = conditions;

		UI.onParamChange(old_name, class_name, method_name, name);

	},

	removeClass: function (name){
		// 1. Проверяем наличие такого класса
		// 2. Удаляем класс
		// 3. Обновляем UI

		if(!APIGenerator.classExists(name)){
			alert("Данного класса не существует");
			return;
		}

		delete APIGenerator.schema.classes[name];

		UI.onClassRemove(name);

	},

	removeMethod: function (class_name, name){
		// 1. Проверяем наличие такого метода
		// 2. Удаляем метод
		// 3. Обновляем UI

		if(!APIGenerator.methodExists(class_name, name)){
			alert("Данного метода не существует");
			return;
		}

		delete APIGenerator.schema.classes[class_name].methods[name];

		UI.onMethodRemove(class_name, name);

	},

	removeParam: function (class_name, method_name, name){
		// 1. Проверяем наличие такого параметра
		// 2. Удаляем параметер
		// 3. Обновляем UI

		if(!APIGenerator.paramExists(class_name, method_name, name)){
			alert("Данного параметра не существует");
			return;
		}

		delete APIGenerator.schema.classes[class_name].methods[method_name].params[name];

		UI.onParamRemove(class_name, method_name, name);

	},

};

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

			var editBtnNewItem = document.createElement('div');
			editBtnNewItem.className = "edit_btn";


		newItem.appendChild(nameNewItem);
		newItem.appendChild(editBtnNewItem);

		return newItem;

	},

	renderMethodItem: function (class_name, name){
		
		var newItem = document.createElement('div');
		newItem.id = "method_" + class_name + "_" + name;
		newItem.className = "item";

			var nameNewItem = document.createElement('div');
			nameNewItem.className = "name";
			nameNewItem.innerHTML = name;

			var editBtnNewItem = document.createElement('div');
			editBtnNewItem.className = "edit_btn";


		newItem.appendChild(nameNewItem);
		newItem.appendChild(editBtnNewItem);

		return newItem;

	},

	renderParamItem: function (class_name, method_name, name){

		var newItem = document.createElement('div');
		newItem.id = "param_" + class_name + "_" + method_name +  "_" + name;
		newItem.className = "item";

			var nameNewItem = document.createElement('div');
			nameNewItem.className = "name";
			nameNewItem.innerHTML = name;

			var editBtnNewItem = document.createElement('div');
			editBtnNewItem.className = "edit_btn";


		newItem.appendChild(nameNewItem);
		newItem.appendChild(editBtnNewItem);

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

				selectInputNewCondItem.value = type;

				var condValueInputNewCondItem = document.createElement('input');
				condValueInputNewCondItem.className = "condition_value bottom10";
				condValueInputNewCondItem.type = "text";
				condValueInputNewCondItem.placeholder = "Введите значение...";
				condValueInputNewCondItem.value = val;

				var centerInputNewCondItem = document.createElement('center');

					var removeBtnInputNewCondItem = document.createElement('a');
					removeBtnInputNewCondItem.className = "gray remove_condition";
					removeBtnInputNewCondItem.innerHTML = "удалить";


		selectInputNewCondItem.appendChild(optionMinLimitInputNewCondItem);
		selectInputNewCondItem.appendChild(optionMaxLimitInputNewCondItem);
		selectInputNewCondItem.appendChild(optionMinLengthInputNewCondItem);
		selectInputNewCondItem.appendChild(optionMaxLengthInputNewCondItem);
		centerInputNewCondItem.appendChild(removeBtnInputNewCondItem);

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
					cond_obj['min'] = condition_value;
				break;
				case 'max_limit':
					cond_obj['max'] = condition_value;
				break;
				case 'min_length':
					cond_obj['min'] = condition_value;
				break;
				case 'max_length':
					cond_obj['max'] = condition_value;
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

	}


};


$(document).ready(function() {


	// 1. Загрузить проект, если он есть в cookie
	// 2. Формирование списка классов из базы
	// 3. Повесить все события

	$('.editcolumns .editcolumn.classes .list').delegate('.item', 'click', function (e){
		var className = $(this)[0];

		UI.openMethodsList(className.id.split('_')[1]);
	});

	$('.editcolumns .editcolumn.methods .list').delegate('.item', 'click', function (e){
		var className = $(this)[0];

		UI.openParamsList(className.id.split('_')[1], className.id.split('_')[2]);
	});

	$('.editcolumns .editcolumn.classes .list').delegate('.item .edit_btn', 'click', function (e){
		var className = $(e.target).parent()[0];

		UI.editClass(className.id.split('_')[1]);
	});

	$('.editcolumns .editcolumn.methods .list').delegate('.item .edit_btn', 'click', function (e){
		var className = $(e.target).parent()[0];

		UI.editMethod(className.id.split('_')[1], className.id.split('_')[2]);
	});

	$('.editcolumns .editcolumn.params .list').delegate('.item .edit_btn', 'click', function (e){
		var className = $(e.target).parent()[0];

		UI.editParam(className.id.split('_')[1], className.id.split('_')[2], className.id.split('_')[3]);
	});

	$('.editcolumns .create_btn.class').on('click', function (e){

		APIGenerator.addClass("newClass", "newDescription");
	});

	$('.editcolumns .create_btn.method').on('click', function (e){
		var class_name = UI.currentClassChoose().className;

		APIGenerator.addMethod(class_name, "newMethod", "newDescription", false, false, false);
	});

	$('.editcolumns .create_btn.param').on('click', function (e){

		var class_name = UI.currentMethodChoose().className;
		var method_name = UI.currentMethodChoose().methodName;

		APIGenerator.addParam(class_name, method_name, "newParam", "newDescription", 1, false, []);
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