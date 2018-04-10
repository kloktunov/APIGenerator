var UI = {

	renderClassItem: function (name, methods){
		var classNode = document.createElement('div');
		classNode.className = "class";

			var classNameNode = document.createElement('div');
			classNameNode.className = "name";
			classNameNode.setAttribute("data-class", name);
			classNameNode.innerHTML = name;

			var classMethodsNode = document.createElement('div');
			classMethodsNode.className = "methods";

			for (var i = 0, length = methods.length; i < length; i++) {

				var method_name = methods[i];

				var methodNode = document.createElement('div');
				methodNode.className = "method";
				methodNode.id = name + "." + methods[i];
				methodNode.setAttribute("data-class", name);
				methodNode.setAttribute("data-method", method_name);
				methodNode.innerHTML = method_name;

				classMethodsNode.appendChild(methodNode);
			}

		classNode.appendChild(classNameNode);
		classNode.appendChild(classMethodsNode);

		return classNode;

	},

	renderFieldItem: function (field){
		var fieldNode = document.createElement('div');
		fieldNode.className = "field";
		fieldNode.setAttribute("data-field", field.name);

			var fieldTypeNode = document.createElement('div');
			fieldTypeNode.className = "type";
			fieldTypeNode.innerHTML = field.type + (field.is_array ? " []" : "");

			var fieldNameNode = document.createElement('div');
			fieldNameNode.className = "name";
			fieldNameNode.innerHTML = field.name;

			var fieldFuncNode = document.createElement('div');
			fieldFuncNode.className = "func";

				var fieldMoveUpNode = document.createElement('div');
				fieldMoveUpNode.className = "move_up";

				var fieldMoveDownNode = document.createElement('div');
				fieldMoveDownNode.className = "move_down";

				var fieldDeleteNode = document.createElement('div');
				fieldDeleteNode.className = "delete";

			fieldFuncNode.appendChild(fieldMoveUpNode);
			fieldFuncNode.appendChild(fieldMoveDownNode);
			fieldFuncNode.appendChild(fieldDeleteNode);

		fieldNode.appendChild(fieldTypeNode);
		fieldNode.appendChild(fieldNameNode);
		fieldNode.appendChild(fieldFuncNode);

		return fieldNode;

	},

	putClassItem: function (classNode){
		var classes_list = document.getElementsByClassName("api_methods")[0].getElementsByClassName("classes")[0];
		classes_list.appendChild(classNode);
	},

	putFieldItem: function (fieldNode){
		var fields_list = document.getElementsByClassName("response_schema")[0].getElementsByClassName("fields")[0].getElementsByClassName("list")[0];
		fields_list.appendChild(fieldNode);
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

		var currentProject = APIGenerator.schema;
		var classesList = currentProject.classes;

		document.getElementsByClassName("api_methods")[0].getElementsByClassName("classes")[0].innerHTML = "";

		for(var name in classesList){
			var newItem = UI.renderClassItem(name, Object.keys(classesList[name].methods));
			UI.putClassItem(newItem);
      	}

	},

	openObject: function (url){
		if(url == document.getElementById("object_url").value) return;

		UI.closeField();	
		
 		document.getElementsByClassName("response_schema")[0].getElementsByClassName("fields")[0].getElementsByClassName("list")[0].innerHTML = "";
 		var queue = url.split('.');

		var class_name = queue[0];
		var method_name = queue[1];

		$('.method.choose').removeClass('choose');
		$('.method[data-class="'+class_name+'"][data-method="'+method_name+'"]').addClass('choose');

		if(queue.length > 2){
			$('.fields .title').addClass('back');
		} else {
			$('.fields .title').removeClass('back');			
		}

		var object = APIGenerator.schema.classes[class_name].methods[method_name].response;
		var fields;

		for (var i = 2, length = queue.length; i < length; i++) {
			var field_name = queue[i];
			
			fields = object.fields;

			for (var j = 0, length_j = fields.length; j < length_j; j++) {
				if(field_name == fields[j].name){
					object = fields[j];
				}	
			}
		}

		fields = object.fields;

		for (var i = 0, length = fields.length; i < length; i++) {
			var fieldNode = UI.renderFieldItem(fields[i]);
			UI.putFieldItem(fieldNode);
		}

		document.getElementById("object_url").value = url;

	},

	openField: function (url){
		if($('#field_url').val() == url) return;

		var queue = url.split('.');

		var class_name = queue[0];
		var method_name = queue[1];


		var object = APIGenerator.schema.classes[class_name].methods[method_name].response;
		var fields;

		for (var i = 2, length = queue.length; i < length; i++) {
			var field_name = queue[i];
			
			fields = object.fields;

			for (var j = 0, length_j = fields.length; j < length_j; j++) {
				if(field_name == fields[j].name){
					object = fields[j];
				}	
			}
		}

		$('.field.choose').removeClass('choose');
		$('.field[data-field="'+object.name+'"]').addClass('choose');

		queue.splice(queue.length - 1, 1);
		var prev_url = queue.join('.');

		UI.openObject(prev_url);

		$('#field_url').val(url);

		switch(object.type){
			case "object":
				$('.edit_object').removeClass('hidden');
				break;
			default:
				$('.edit_object').addClass('hidden');
				break;
		}

		$('#edit_field_name').val(object.name);
		$('#edit_field_type').val(object.type);
		$('#is_array').attr('checked', object.is_array);
		$('#is_optional').attr('checked', object.is_optional);

		$('.field_description').removeClass('hidden');

	},

	closeField: function (){
		$('.field.choose').removeClass('choose');

		$('#field_url').val("");

		$('#edit_field_name').val("");
		$('#edit_field_type').val("int");
		$('#is_array').attr('checked', false);
		$('#is_optional').attr('checked', false);

		$('.edit_object').addClass('hidden');

		$('.field_description').addClass('hidden');
	},

	goToPrevObject: function (){
		var url = document.getElementById("object_url").value;
		var queue = url.split('.');

		if(queue.length <= 2) return;

		queue.splice(queue.length - 1, 1);
		var prev_url = queue.join('.');

		UI.openObject(prev_url);
	},


	createField: function (name, type, is_array, is_optional, url){

		var field = APIGenerator.addObjectField(name, type, is_array, is_optional, ...url.split('.'));
		if(!field){
			return;
		}

		if(url == document.getElementById("object_url").value){
			var fieldNode = UI.renderFieldItem(field);
			UI.putFieldItem(fieldNode);
		}
	},

	removeField: function (name, url){

		var field = APIGenerator.removeObjectField(name, ...url.split('.'));

		if(!field){
			return;
		}

		$('.field[data-field="'+name+'"]').remove();

		if($('#field_url').val() == url + "." + name){
			UI.closeField();
		}

	},

	moveUp: function (name, url){
		if(!APIGenerator.moveFieldUp(name, ...url.split('.'))){
			return;
		}

		if(url != document.getElementById("object_url").value){
			return;
		}

		var fieldNode = $('.field[data-field="'+name+'"]');
		fieldNode.prev().insertAfter(fieldNode);

	},

	moveDown: function (name, url){
		if(!APIGenerator.moveFieldDown(name, ...url.split('.'))){
			return;
		}

		var fieldNode = $('.field[data-field="'+name+'"]');
		fieldNode.next().insertBefore(fieldNode);
	},

	saveField: function (){
		var url = $('#field_url').val();
		var object_url = $('#object_url').val();

		var queue = url.split('.');


		var name = $('#edit_field_name').val();
		var type = $('#edit_field_type').val();
		var is_array = $('#is_array').attr('checked');
		var is_optional = $('#is_optional').attr('checked');

		var old_name = queue[queue.length - 1];
		var res = APIGenerator.editObjectField(old_name, name, type, is_array, is_optional, ...object_url.split('.'));

		if(!res){
			console.log(res);
			return;
		}

		$('.field[data-field="'+old_name+'"]').attr("data-field", res.name);
		$('.field[data-field="'+res.name+'"] .type').html(res.type + (res.is_array ? " []" : ""));
		$('.field[data-field="'+res.name+'"] .name').html(res.name);

		if(res.type == "object"){
			$('.edit_object').removeClass('hidden');
		} else {
			$('.edit_object').addClass('hidden');			
		}
	}


};


$(document).ready(function() {

	$('.navbar .buttons .load_project').on('click', UI.loadProject);
	$('.navbar .buttons .save_project').on('click', APIGenerator.schema.saveProject);

	$('.response_schema .fields .title').on('click', UI.goToPrevObject);

	$('.api_methods .classes .method').live('click', function (){

		var class_name = $(this).data('class');
		var method_name = $(this).data('method');

		UI.openObject(class_name + '.' + method_name);
	});

	$('.response_schema .fields .list .field .delete').live('click', function (){

		var url = $('#object_url').val();
		var name = $(this).parents('.field').data("field");
 
		UI.removeField(name, url);

		return false;

	});

	$('.response_schema .fields .list .field .move_up').live('click', function (){

		var url = $('#object_url').val();
		var name = $(this).parents('.field').data("field");
 
		UI.moveUp(name, url);

		return false;

	});

	$('.response_schema .fields .list .field .move_down').live('click', function (){

		var url = $('#object_url').val();
		var name = $(this).parents('.field').data("field");
 
		UI.moveDown(name, url);

		return false;

	});


	$('.response_schema .fields .list .field').live('click', function (){

		var url = $('#object_url').val();

		UI.openField(url + '.' + $(this).data('field'));

	});

	$('.response_schema .fields .add_field').on('click', function (){
		var count = $('.response_schema .fields .list .field').length;
		var url = document.getElementById("object_url").value;
		UI.createField("newField" + count, "int", false, false, url);
	});


	$('.response_schema .field_description .title .close').on('click', UI.closeField);
	$('.response_schema .field_description .funcs .edit_object').on('click', function (){
		var url = document.getElementById("field_url").value;		
		UI.openObject(url);
	});
	$('.response_schema .field_description .funcs .save_btn').on('click', UI.saveField);

});