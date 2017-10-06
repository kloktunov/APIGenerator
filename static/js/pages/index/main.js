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

			window.onbeforeunload = null;

			APIGenerator.schema.status  = 0;
		},

		project: {
			id: 1,
			name: "Тестовый проект",
			version: 0.1,
			changeVersion: 144023234,
			description: "Проект создан для тестирования новой платформы" 
		},



		classes: {

			users: {
				name: "users",
				description: "Класс содержит в себе методы для работы с пользователями",

				methods: {
					get: {
						name: "get",
						description: "Получает информацию о пользователе по его ID",

						is_auth: true,
						is_admin: false,
						is_db: true,

						params: {
							id: {
								name: "id",
								description: "Индивидуальный индентификатор пользователя",

								type: 1,

								optional: false

							}
						}
					},

				}
			},

			auth: {
				name: "auth",
				description: "Класс содержит в себе методы для работы с авторизацией",

				methods: {

				}
			}

		}

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

	addParam: function (class_name, method_name, name, description, type,  optional){
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
			optional: optional

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

	editParam: function (old_name, class_name, method_name, name, description, type, optional){
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

	}

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

		if(UI.currentMethodChoose().className == class_name && UI.currentMethodChoose().methodName == method_name){
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
		inputDescription.innerText = classData.description;

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
		inputDescription.innerHTML = methodData.description;
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

		var inputName = editWindowParamsElem.getElementsByClassName('param_name')[0];
		var inputDescription = editWindowParamsElem.getElementsByClassName('param_description')[0];
		var selectType = editWindowParamsElem.getElementsByClassName('param_type')[0];
		var checkboxOptional = document.getElementById('checkbox_optional');

		var inputHiddenClass = editWindowParamsElem.getElementsByClassName('edit_class_name')[0];
		var inputHiddenMethod = editWindowParamsElem.getElementsByClassName('edit_method_name')[0];
		var inputHiddenParam = editWindowParamsElem.getElementsByClassName('edit_param_name')[0];

		var classData = APIGenerator.schema.classes[class_name];
		var methodData = classData.methods[method_name];
		var paramData = methodData.params[name];

		inputName.value = paramData.name;
		inputDescription.innerText = paramData.description;
		selectType.value = paramData.type;
		checkboxOptional.checked = paramData.optional;
		
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
		var newClassDescription = inputDescription.innerHTML;

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
		var newMethodDescription = inputDescription.innerHTML;
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

		var inputHiddenClass = editWindowParamsElem.getElementsByClassName('edit_class_name')[0];
		var inputHiddenMethod = editWindowParamsElem.getElementsByClassName('edit_method_name')[0];
		var inputHiddenParam = editWindowParamsElem.getElementsByClassName('edit_param_name')[0];

		var oldParamName = inputHiddenParam.value;
		var className = inputHiddenClass.value;
		var methodName = inputHiddenMethod.value;
		var newParamName = inputName.value;
		var newParamDescription = inputDescription.innerHTML;
		var newParamType = selectType.value;
		var newParamOptional = checkboxOptional.checked;

		inputHiddenParam.value = newParamName;

		APIGenerator.editParam(oldParamName, className, methodName, newParamName, newParamDescription, newParamType, newParamOptional);

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

		APIGenerator.addParam(class_name, method_name, "newParam", "newDescription", 1, false);
	});

	$('.editwindows .close_btn').on('click', function (e){

		UI.closeEditWindow();
	});


	$('.editwindows .editwindow.classes .save_btn').on('click', UI.saveClass);
	$('.editwindows .editwindow.methods .save_btn').on('click', UI.saveMethod);
	$('.editwindows .editwindow.params .save_btn').on('click', UI.saveParam);

});