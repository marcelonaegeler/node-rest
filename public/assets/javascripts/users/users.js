define(
  'users',
  [ 
  	'jquery'
  	, 'underscore'
  	, 'backbone'
  ],
  function() {
    'use strict';

    var User = function() {
    	var loadingTemplate = '<div class="container">'
    		+'<div class="container-head">'
    		+'<div class="text-center">Loading...</div></div></div>'
    		;

    	var GetUsers = Backbone.Collection.extend({
				url: '/users'
			});
			
    	var UserList = Backbone.View.extend({
				el: '.page'
				, render: function() {
					var $scope = this;
					this.$el.html(loadingTemplate);

					var view = $.get('/views/list.html');

					view.success(function(html) {
						var users = new GetUsers();
						var template = _.template(html);

						users.fetch({
							success: function(data) {
								$scope.$el.html(template({ users: data.models }));
							}
						});
					});
				}
			});

			var UserForm = Backbone.View.extend({
				el: '.page'
				, template: function(callback) {
					var view = $.get('/views/form.html');
					view.success(function(html) {
						return callback(html)
					});
				}
				, getData: function(id, callback) {
					if(!id)
						return callback();
					else {
						var getDataUser = Backbone.Collection.extend({ url: '/user/'+ id });
						var user = new getDataUser();
						user.fetch({
							success: function(data) {
								return callback(data);
							}
						});
					}
				}
				, render: function(options) {
					var $scope = this;
					this.$el.html(loadingTemplate);

					this.template(function(html) {
						$scope.getData(options.id, function(data) {
							var user = {
								name: data ? data.models[0].get('name') : ''
								, email: data ? data.models[0].get('email') : ''
								, username: data ? data.models[0].get('username') : ''
								, _id: data ? data.models[0].get('_id') : ''
							}
							
							var template = _.template(html)({ user: user });
							$scope.$el.html(template);
						})
					});
				}
				, events: {
					'submit .formUser': 'saveUser'
				}
				, saveUser: function(ev) {
					var details = $(ev.currentTarget).serialize();
					
					$.ajax({
						url: '/user'
						, data: details
						, type: 'put'
						, success: function(data) {
							alert('Salvo!');
							console.log(data);
							router.navigate('', { trigger: true });
						}
						, error: function(err) {
							alert('Erro!');
							console.log(err);
						}
					});
					return false;
				}
			});

			var Router = Backbone.Router.extend({
				routes: {
					'': 'home'
					, 'user(/)(:id)': 'user'
					, 'user/delete/:id': 'delete-user'
					, '*path':  'defaultRoute'
				}
			});

			var userList = new UserList();
			var userForm = new UserForm();

			var router = new Router();

			router.on('route:home', function() {
				userList.render();
			});
			
			router.on('route:user', function(id) {
				userForm.render({ id: id });
			});

			router.on('route:delete-user', function(id) {
				$.ajax({
					type: 'delete'
					, url: '/user/'+ id
					, success: function(data) {
						router.navigate('', { trigger: true });
					}
				});
			});

			router.on('route:defaultRoute', function(id) {
				router.navigate('', { trigger: true });
			});
			
			Backbone.history.start();
		}    
    return new User;
	}
);
