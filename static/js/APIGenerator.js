window.onbeforeunload = function(e) {
  var dialogText = 'Dialog text here';
  e.returnValue = dialogText;
  return dialogText;
};

var APIGenerator = {

	schema: {

		saveProject: function (){

			// 1. Загружаем данные на сервер
			// 2. Меняем статус
			// 3. Снимаем событие

			APIGenerator.schema.status  = 0;

			var saveObject = {
				classes: APIGenerator.schema.classes,
			};

			var saveObjectStr = JSON.stringify(saveObject);

			var a = document.createElement("a");
		    var file = new Blob([saveObjectStr], {type: "application/json"});
		    a.href = URL.createObjectURL(file);
		    a.download = "schema.json";
		    a.click();

		},

		newProjectClasses: {"api":{"name":"api","description":"Класс содержит методы для получения информации об текущем API","methods":{"version":{"name":"version","description":"Получает информацию о версии текущего API","is_auth":false,"is_admin":false,"is_db":false,"params":{}},"getClasses":{"name":"getClasses","description":"Возвращает список классов API","is_auth":false,"is_admin":false,"is_db":false,"params":{"offset":{"name":"offset","description":"Смещение выборки","type":1,"optional":false,"conditions":[{"type":"min_limit","min":0}]},"count":{"name":"count","description":"Количество классов, которое нужно вывести","type":1,"optional":false,"conditions":[{"type":"min_limit","min":0},{"type":"max_limit","max":100}]}}},"getClassByName":{"name":"getClassByName","description":"Возвращает информацию о классе по его имени","is_auth":false,"is_admin":false,"is_db":false,"params":{"class_name":{"name":"class_name","description":"Имя класс, о котором мы хотим получить информацию","type":2,"optional":false,"conditions":[]}}},"getMethods":{"name":"getMethods","description":"Возвращает список методов для класса","is_auth":false,"is_admin":false,"is_db":false,"params":{"offset":{"name":"offset","description":"Смещение выборки","type":1,"optional":false,"conditions":[{"type":"min_limit","min":0}]},"count":{"name":"count","description":"Количество методов, которое надо вывести","type":1,"optional":false,"conditions":[{"type":"min_limit","min":0},{"type":"max_limit","max":100}]}}},"getMethodByName":{"name":"getMethodByName","description":"Возвращает информацию о методе по имени","is_auth":false,"is_admin":false,"is_db":false,"params":{"class_name":{"name":"class_name","description":"Имя класса, к которому относится метод","type":2,"optional":false,"conditions":[]},"method_name":{"name":"method_name","description":"Имя метода, о котором мы хотим получить информацию","type":2,"optional":false,"conditions":[]}}},"getParams":{"name":"getParams","description":"Возвращает информацию о параметрах метода","is_auth":false,"is_admin":false,"is_db":false,"params":{"offset":{"name":"offset","description":"Смещение выборки","type":1,"optional":false,"conditions":[{"type":"min_limit","min":0}]},"count":{"name":"count","description":"Количество параметров, которое мы хотим получить","type":1,"optional":false,"conditions":[{"type":"min_limit","min":0},{"type":"max_limit","max":100}]}}},"getParamByName":{"name":"getParamByName","description":"Возвращает информацию о параметра по имени","is_auth":false,"is_admin":false,"is_db":false,"params":{"class_name":{"name":"class_name","description":"Имя класса, к которому относится параметр","type":2,"optional":false,"conditions":[]},"method_name":{"name":"method_name","description":"Имя метода, к которому относится параметр","type":2,"optional":false,"conditions":[]},"param_name":{"name":"param_name","description":"Имя параметра, о котором мы хотим получить информацию","type":2,"optional":false,"conditions":[]}}},"getTypes":{"name":"getTypes","description":"Возвращает список типов данных API","is_auth":false,"is_admin":false,"is_db":false,"params":{"offset":{"name":"offset","description":"Смещение выборки","type":2,"optional":false,"conditions":[{"type":"min_limit","min":0}]},"count":{"name":"count","description":"Количество типов, которое мы хотим получить","type":1,"optional":false,"conditions":[{"type":"min_limit","min":0},{"type":"max_limit","max":100}]}}},"getTypeByName":{"name":"getTypeByName","description":"Возвращает информацию о тип по его имени","is_auth":false,"is_admin":false,"is_db":false,"params":{"type_name":{"name":"type_name","description":"Имя типа информацию о котором мы хотим получить","type":2,"optional":false,"conditions":[]}}},"getErrorById":{"name":"getErrorById","description":"Возвращает информацию об ошибки по ID","is_auth":false,"is_admin":false,"is_db":false,"params":{"id":{"name":"id","description":"ID ошибки, информацию о которой мы хотим получить","type":1,"optional":false,"conditions":[]}}},"getErrors":{"name":"getErrors","description":"Возвращает список ошибок API","is_auth":false,"is_admin":false,"is_db":false,"params":{"offset":{"name":"offset","description":"Смещение выборки","type":1,"optional":false,"conditions":[{"type":"min_limit","min":0}]},"count":{"name":"count","description":"Количество ошибок, которое мы хотим получить","type":1,"optional":false,"conditions":[{"type":"min_limit","min":0},{"type":"max_limit","max":100}]}}}}},"account":{"name":"account","description":"Класс содержит методы для работы с аккаунтом","methods":{"get":{"name":"get","description":"Получает информацию об аккаунте","is_auth":true,"is_admin":false,"is_db":true,"params":{}},"changeLogin":{"name":"changeLogin","description":"Метод изменения логина аккаунта","is_auth":true,"is_admin":false,"is_db":true,"params":{"login":{"name":"login","description":"Логин от аккаунта","type":2,"optional":false,"conditions":[]},"password":{"name":"password","description":"Пароль от аккаунта","type":2,"optional":false,"conditions":[]},"new_login":{"name":"new_login","description":"Новый логин от аккаунта","type":2,"optional":false,"conditions":[]}}},"changePassword":{"name":"changePassword","description":"Метод изменения пароля аккаунта","is_auth":true,"is_admin":false,"is_db":true,"params":{"password":{"name":"password","description":"Пароль от аккаунта","type":2,"optional":false,"conditions":[]},"new_password":{"name":"new_password","description":"Новый пароль от аккаунта","type":2,"optional":false,"conditions":[]}}},"addAccount":{"name":"addAccount","description":"Добавить аккаунт другого сервиса к данному аккаунту","is_auth":true,"is_admin":false,"is_db":true,"params":{"service":{"name":"service","description":"Имя сервиса, которое мы хотим добавить","type":2,"optional":false,"conditions":[]},"request_code":{"name":"request_code","description":"Code для получения access_token сервиса","type":2,"optional":false,"conditions":[]}}},"changeAccount":{"name":"changeAccount","description":"Изменить прикрепленный аккаунт","is_auth":true,"is_admin":false,"is_db":true,"params":{"service":{"name":"service","description":"Имя сервиса, которое нужно изменить","type":2,"optional":false,"conditions":[]},"request_code":{"name":"request_code","description":"Code для получения нового access_token","type":2,"optional":false,"conditions":[]}}},"removeAccount":{"name":"removeAccount","description":"Удалить аккаунт другого сервиса","is_auth":true,"is_admin":false,"is_db":true,"params":{"service":{"name":"service","description":"Имя сервиса, которое нужно удалить","type":2,"optional":false,"conditions":[]}}}}},"signup":{"name":"signup","description":"Класс содержит в себе методы для регистрации нового пользователя","methods":{"newAccount":{"name":"newAccount","description":"Метод создания нового аккаунта","is_auth":false,"is_admin":false,"is_db":true,"params":{"login":{"name":"login","description":"Логин для нового аккаунта","type":2,"optional":false,"conditions":[]},"password":{"name":"password","description":"Пароль для нового аккаунта","type":2,"optional":false,"conditions":[]},"first_name":{"name":"first_name","description":"Имя пользователя для создания аккаунта","type":2,"optional":false,"conditions":[]},"last_name":{"name":"last_name","description":"Фамилия пользователя для нового аккаунта","type":2,"optional":false,"conditions":[]},"captcha_id":{"name":"captcha_id","description":"ID captcha для создания нового аккаунта","type":1,"optional":false,"conditions":[]},"captcha_code":{"name":"captcha_code","description":"Код captcha для создания нового аккаунта","type":2,"optional":false,"conditions":[]}}}}},"auth":{"name":"auth","description":"Класс содержит в себе методы для работы с авторизацией","methods":{"login":{"name":"login","description":"Метод для авторизации пользователя","is_auth":false,"is_admin":false,"is_db":true,"params":{"login":{"name":"login","description":"Логин пользователя","type":2,"optional":false,"conditions":[]},"password":{"name":"password","description":"Пароль пользователя","type":2,"optional":false,"conditions":[]},"captcha_id":{"name":"captcha_id","description":"ID captcha для авторизации пользователя","type":1,"optional":true,"conditions":[{"type":"min_limit","min":0}]},"captcha_code":{"name":"captcha_code","description":"Код captcha для авторизации пользователя","type":2,"optional":true,"conditions":[]}}}}},"admin":{"name":"admin","description":"Класс содержит в себе методы для администрирования","methods":{"banAccount":{"name":"banAccount","description":"Метод блокирует аккаунт","is_auth":true,"is_admin":true,"is_db":true,"params":{"id":{"name":"id","description":"ID аккаунта","type":1,"optional":false,"conditions":[{"type":"min_limit","min":0}]},"reason":{"name":"reason","description":"Причина блокировки аккаунта","type":2,"optional":true,"conditions":[]}}},"unbanAccount":{"name":"unbanAccount","description":"Метод для разбана аккаунта","is_auth":true,"is_admin":true,"is_db":true,"params":{"id":{"name":"id","description":"ID аккаунта для разбана","type":1,"optional":false,"conditions":[{"type":"min_limit","min":0}]}}},"getBanList":{"name":"getBanList","description":"Получить список забаненных пользователей","is_auth":true,"is_admin":true,"is_db":true,"params":{"offset":{"name":"offset","description":"Смещение выборки","type":1,"optional":false,"conditions":[{"type":"min_limit","min":0}]},"count":{"name":"count","description":"Количество записей, которое необходимо вернуть","type":1,"optional":false,"conditions":[{"type":"min_limit","min":0},{"type":"max_limit","max":100}]}}}}},"realtime":{"name":"realtime","description":"Класс с методами для работы с сервером realtime","methods":{"getCode":{"name":"getCode","description":"Получить код для авторизации на realtime-сервере","is_auth":true,"is_admin":false,"is_db":true,"params":{}}}},"captcha":{"name":"captcha","description":"Класс для работы с методами captcha","methods":{"get":{"name":"get","description":"Метод возвращает сгенерированную captcha","is_auth":false,"is_admin":false,"is_db":true,"params":{}}}},"users":{"name":"users","description":"Класс для работы с пользователями","methods":{"getById":{"name":"getById","description":"Получить информацию о пользователе по ID","is_auth":false,"is_admin":false,"is_db":true,"params":{"id":{"name":"id","description":"ID пользователя","type":1,"optional":true,"conditions":[{"type":"min_limit","min":0}]},"screen_name":{"name":"screen_name","description":"Никнейм пользователя","type":2,"optional":true,"conditions":[]}}},"search":{"name":"search","description":"Метод для поиска по пользователям","is_auth":false,"is_admin":false,"is_db":true,"params":{"q":{"name":"q","description":"Строка запроса для поиска по пользователям","type":2,"optional":false,"conditions":[]}}},"follow":{"name":"follow","description":"Подписаться на пользователя","is_auth":true,"is_admin":false,"is_db":true,"params":{"id":{"name":"id","description":"ID пользователя","type":1,"optional":false,"conditions":[{"type":"min_limit","min":0}]}}},"unfollow":{"name":"unfollow","description":"Метод для отписки от пользователя","is_auth":true,"is_admin":false,"is_db":true,"params":{"id":{"name":"id","description":"ID пользователя","type":1,"optional":false,"conditions":[{"type":"min_limit","min":0}]}}},"getFollows":{"name":"getFollows","description":"Получить список подписок пользователя","is_auth":false,"is_admin":false,"is_db":true,"params":{"offset":{"name":"offset","description":"Смещение выборки","type":1,"optional":false,"conditions":[{"type":"min_limit","min":0}]},"count":{"name":"count","description":"Количество записей для выдачи","type":1,"optional":false,"conditions":[{"type":"min_limit","min":0},{"type":"max_limit","max":100}]}}},"getFollowers":{"name":"getFollowers","description":"Получить список подписчиков пользователя","is_auth":false,"is_admin":false,"is_db":true,"params":{"offset":{"name":"offset","description":"Смещение выборки","type":1,"optional":false,"conditions":[{"type":"min_limit","min":0}]},"count":{"name":"count","description":"Количество записей для выборки","type":1,"optional":false,"conditions":[{"type":"min_limit","min":0},{"type":"max_limit","max":100}]}}},"isFollow":{"name":"isFollow","description":"Проверить подписан ли текущий пользователь на данного пользователя","is_auth":true,"is_admin":false,"is_db":true,"params":{}}}},"settings":{"name":"settings","description":"Класс для работы с настройками пользователя","methods":{"changeScreenName":{"name":"changeScreenName","description":"Метод для смены никнейма","is_auth":true,"is_admin":false,"is_db":true,"params":{"screen_name":{"name":"screen_name","description":"Новый никнейм для профиля","type":2,"optional":false,"conditions":[]}}},"changeName":{"name":"changeName","description":"Метод для изменения имени пользователя","is_auth":true,"is_admin":false,"is_db":true,"params":{"first_name":{"name":"first_name","description":"Новое имя профиля","type":2,"optional":false,"conditions":[]},"last_name":{"name":"last_name","description":"Новая фамилия профиля","type":2,"optional":false,"conditions":[]}}},"changeSex":{"name":"changeSex","description":"Изменить пол пользователя","is_auth":true,"is_admin":false,"is_db":true,"params":{"sex":{"name":"sex","description":"Новый пол профиля","type":1,"optional":false,"conditions":[{"type":"min_limit","min":0},{"type":"max_limit","max":1}]}}},"changeDOB":{"name":"changeDOB","description":"Изменить дату рождения","is_auth":true,"is_admin":false,"is_db":true,"params":{"dob":{"name":"dob","description":"Новая дата рождения в формате ГГГГММДД","type":"1","optional":false,"conditions":[{"type":"min_limit","min":"19000101"}]}}},"changePhoto":{"name":"changePhoto","description":"Изменить фотографию профиля","is_auth":true,"is_admin":false,"is_db":true,"params":{"pid":{"name":"pid","description":"ID фотографии для установки на аватар","type":"1","optional":false,"conditions":[{"type":"min_limit","min":"0"}]},"width_crop":{"name":"width_crop","description":"Ширина для квадрата обрезания","type":"1","optional":false,"conditions":[{"type":"min_limit","min":"0"}]},"x_crop":{"name":"x_crop","description":"X-координата для левого верхнего угла квадрата обрезания","type":"1","optional":false,"conditions":[{"type":"min_limit","min":"0"}]},"y_crop":{"name":"y_crop","description":"Y-координата левого верхнего угла квадрата обрезания","type":"1","optional":false,"conditions":[{"type":"min_limit","min":"0"}]}}},"removePhoto":{"name":"removePhoto","description":"Удалить фотографию профиля","is_auth":true,"is_admin":false,"is_db":true,"params":{}}}},"photos":{"name":"photos","description":"Класс для работы с фотографиями","methods":{"get":{"name":"get","description":"Метод для получения списка фотографий","is_auth":false,"is_admin":false,"is_db":true,"params":{"offset":{"name":"offset","description":"Смещение выборки","type":1,"optional":false,"conditions":[{"type":"min_limit","min":0}]},"count":{"name":"count","description":"Количество фотографий, которое необхожимо вернуть","type":1,"optional":false,"conditions":[{"type":"min_limit","min":0},{"type":"max_limit","max":50}]},"sizes":{"name":"sizes","description":"Размеры фотографий, которое необходимо вернуть, через запятую","type":2,"optional":true,"conditions":[]},"album":{"name":"album","description":"Альбом из которого необходимо вернуть фотографии","type":2,"optional":true,"conditions":[]}}},"getById":{"name":"getById","description":"Получение информации о фотографии по ID","is_auth":false,"is_admin":false,"is_db":true,"params":{"id":{"name":"id","description":"ID фотографии, которой необходимо вернуть","type":1,"optional":false,"conditions":[{"type":"min_limit","min":0}]},"sizes":{"name":"sizes","description":"Размеры фотографии, которые необходимо вернуть, через запятую","type":2,"optional":true,"conditions":[]}}},"remove":{"name":"remove","description":"Метод для удаления фотографии","is_auth":true,"is_admin":false,"is_db":true,"params":{"id":{"name":"id","description":"ID фотографии, которую необходимо удалить","type":1,"optional":false,"conditions":[{"type":"min_limit","min":0}]}}},"getUploadServer":{"name":"getUploadServer","description":"Получить сервер для загрузки фотографии","is_auth":true,"is_admin":false,"is_db":true,"params":{}},"changeDescription":{"name":"changeDescription","description":"Изменить описание фотографии","is_auth":true,"is_admin":false,"is_db":true,"params":{"id":{"name":"id","description":"ID фотографии, описание которой необходимо изменить","type":1,"optional":false,"conditions":[{"type":"min_limit","min":0}]},"description":{"name":"description","description":"Новое описание фотографии","type":2,"optional":false,"conditions":[]}}}}},"notifications":{"name":"notifications","description":"Класс для работы с уведомленями","methods":{"getCounts":{"name":"getCounts","description":"Возвращает количество уведомлений","is_auth":true,"is_admin":false,"is_db":true,"params":{}},"getEvents":{"name":"getEvents","description":"Возвращает список событий","is_auth":true,"is_admin":false,"is_db":true,"params":{}}}}},
		classes: {},


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

			},

			response: {

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
			type: parseInt(type),
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
		APIGenerator.schema.classes[class_name].methods[method_name].params[name].type = parseInt(type);
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

	moveClassTo: function (class_name, vector){
		if(!APIGenerator.classExists(class_name)){
			alert("Данного класса не существует");
			return false;
		}

		var classes = Object.keys(APIGenerator.schema.classes);
		var class_position = classes.indexOf(class_name);

		if(class_position == 0 && vector == "up") return false;
		if(class_position == classes.length - 1 && vector == "down") return false;

		var new_classes = {};

		for(var i = 0, length = classes.length; i < length - 1; i++){
			var f = classes[i];
			var s = classes[i+1];


			if((f == class_name && vector == "down") || (s == class_name && vector == "up")){
				
				delete(new_classes[f]);

				new_classes[s] = APIGenerator.schema.classes[s];
				new_classes[f] = APIGenerator.schema.classes[f];
			} else {
				new_classes[f] = APIGenerator.schema.classes[f];
				new_classes[s] = APIGenerator.schema.classes[s];
			}


		}

		APIGenerator.schema.classes = new_classes;

		return true;

	},

	moveMethodTo: function(class_name, method_name, vector){
		if(!APIGenerator.methodExists(class_name, method_name)){
			alert("Данного метода не существует");
			return false;
		}

		var methods = Object.keys(APIGenerator.schema.classes[class_name].methods);
		var method_position = methods.indexOf(method_name);

		if(method_position == 0 && vector == "up") return false;
		if(method_position == methods.length - 1 && vector == "down") return false;

		var new_methods = {};

		for(var i = 0, length = methods.length; i < length - 1; i++){
			var f = methods[i];
			var s = methods[i+1];

			if((f == method_name && vector == "down") || (s == method_name && vector == "up")){

				delete(new_methods[f]);

				new_methods[s] = APIGenerator.schema.classes[class_name].methods[s];
				new_methods[f] = APIGenerator.schema.classes[class_name].methods[f];
			} else {
				new_methods[f] = APIGenerator.schema.classes[class_name].methods[f];
				new_methods[s] = APIGenerator.schema.classes[class_name].methods[s];
			}

		}

		APIGenerator.schema.classes[class_name].methods = new_methods;

		return true;

	},

	moveParamTo: function(class_name, method_name, param_name, vector){
		if(!APIGenerator.paramExists(class_name, method_name, param_name)){
			alert("Данного параметра не существует");
			return false;
		}

		var params = Object.keys(APIGenerator.schema.classes[class_name].methods[method_name].params);
		var param_position = params.indexOf(param_name);

		if(param_position == 0 && vector == "up") return false;
		if(param_position == params.length - 1 && vector == "down") return false;

		var new_params = {};

		for(var i = 0, length = params.length; i < length - 1; i++){
			var f = params[i];
			var s = params[i+1];

			if((f == param_name && vector == "down") || (s == param_name && vector == "up")){

				delete(new_params[f]);

				new_params[s] = APIGenerator.schema.classes[class_name].methods[method_name].params[s];
				new_params[f] = APIGenerator.schema.classes[class_name].methods[method_name].params[f];
			} else {
				new_params[f] = APIGenerator.schema.classes[class_name].methods[method_name].params[f];
				new_params[s] = APIGenerator.schema.classes[class_name].methods[method_name].params[s];
			}

		}

		APIGenerator.schema.classes[class_name].methods[method_name].params = new_params;

		return true;

	},

	// RESPONSES

	buildResponseSchema: function (){

		var classes = Object.keys(APIGenerator.schema.classes);
		for (var i = 0, length = classes.length; i < length; i++) {
			var class_name = classes[i];

			var methods = Object.keys(APIGenerator.schema.classes[class_name].methods);
			for (var j = 0, length_j = methods.length; j < length_j; j++) {
				var method_name = methods[j];

				APIGenerator.schema.classes[class_name].methods[method_name]["response"] = { fields: [] };	
			}
		}

	},

	renderResponseField: function (name, type, is_array, is_optional){

		switch(type){
			case "int":
			case "float":
			case "string":
			case "object":
				break;
			default:
				return false;
				break;
		}

		var field = {
			type: type,
			name: name,
			is_array: is_array ? true : false,
			is_optional: is_optional ? true: false
		};

		if (type == "object") {
			field.fields = [];
		}

		return field;
	},

	getResponseFieldIndexByName: function (object, name){
		var fields = object.fields;
		var field;
		for(var i = 0, length = fields.length; i < length; i++){
			field = fields[i];
			if(field.name == name){
				return i;
			}
		}

		return -1;

	},

	getResponseFieldByName: function (object, name){
		
		var fields = object.fields;
		var field;
		for(var i = 0, length = fields.length; i < length; i++){
			field = fields[i];
			if(field.name == name){
				return field;
			}
		}

		return false;
	},

	responseFieldExists: function(name, ...object_url){
		var object = APIGenerator.schema.classes[object_url[0]].methods[object_url[1]].response;
		var fields = object.fields;
		var field;
		for(var i = 0, length = fields.length; i < length; i++){
			field = fields[i];
			if(field.name == name){
				return true;
			}
		}

		return false;

	},

	addObjectField: function (name, type, is_array, is_optional, ...object_url){

		var field = APIGenerator.renderResponseField(name, type, is_array, is_optional);
		
		if(!field) return false;

		var object = APIGenerator.schema.classes[object_url[0]].methods[object_url[1]].response;

		for(var i = 2, length = object_url.length; i < length; i++){
			object = APIGenerator.getResponseFieldByName(object, object_url[i]);
		}

		object.fields.push(field);

		return field;
	},

	editObjectField: function (old_name, name, type, is_array, is_optional, ...object_url){

		var field = APIGenerator.renderResponseField(name, type, is_array, is_optional);
		
		if(!field) return false;

		if(!APIGenerator.responseFieldExists(old_name, ...object_url)) return false;

		var object = APIGenerator.schema.classes[object_url[0]].methods[object_url[1]].response;

		for(var i = 2, length = object_url.length; i < length; i++){
			object = APIGenerator.getResponseFieldByName(object, object_url[i]);
			if(object == false) return false;
		}

		var index = APIGenerator.getResponseFieldIndexByName(object, old_name);
		object.fields[index] = field;

		return field;
	},

	removeObjectField: function (name, ...object_url){

		var object = APIGenerator.schema.classes[object_url[0]].methods[object_url[1]].response;
		for(var i = 2, length = object_url.length; i < length; i++){
			object = APIGenerator.getResponseFieldByName(object, object_url[i]);
			if(object == false) return false;
		}

		var index = APIGenerator.getResponseFieldIndexByName(object, name);
		object.fields.splice(index, 1);

		return true;
	},

	moveFieldUp: function (name, ...object_url){
		if(!APIGenerator.responseFieldExists(name, ...object_url)) return false;

		var object = APIGenerator.schema.classes[object_url[0]].methods[object_url[1]].response;

		for(var i = 2, length = object_url.length; i < length; i++){
			object = APIGenerator.getResponseFieldByName(object, object_url[i]);
			if(object == false) return false;
		}

		var index = APIGenerator.getResponseFieldIndexByName(object, name);
		
		if(index == 0){
			return false;
		}

		var tmpField = object.fields[index - 1];
		object.fields[index - 1] = object.fields[index];
		object.fields[index] = tmpField;

		return true;
	},

	moveFieldDown: function(name, ...object_url){
		if(!APIGenerator.responseFieldExists(name, ...object_url)) return false;

		var object = APIGenerator.schema.classes[object_url[0]].methods[object_url[1]].response;

		for(var i = 2, length = object_url.length; i < length; i++){
			object = APIGenerator.getResponseFieldByName(object, object_url[i]);
			if(object == false) return false;
		}

		var index = APIGenerator.getResponseFieldIndexByName(object, name);
		
		if(index == object.fields.length - 1){
			return false;
		}

		var tmpField = object.fields[index + 1];
		object.fields[index + 1] = object.fields[index];
		object.fields[index] = tmpField;

		return true;
	}

};