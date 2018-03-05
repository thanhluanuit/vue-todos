class Tasks {
  static initialize(){
    // Component Todo Item
    var todoItem = Vue.component('task-item', {
      template: '#task-item',
      props: ['task'],
      methods: {
        removeTask: function(){
          this.$emit('delete', this.task);
        },
        updateTask: function(){
          this.$emit('update', this.task);
        }
      }
    });

    // Filters
    var filters = {
      all: function (tasks) {
        return tasks;
      },
      active: function (tasks) {
        return tasks.filter(function (task) {
          return !task.completed
        });
      },
      completed: function (tasks) {
        return tasks.filter(function (task) {
          return task.completed
        });
      }
    };

    new Vue({
      el: '#todos-app',
      data: function(){
        return {
          tasks: [],
          task: {
            content: ''
          },
          currentFilter: 'all'
        }
      },
      created: function () {
        this.getAllTasks();
      },
      computed: {
        filteredTasks: function () {
          return filters[this.currentFilter](this.tasks);
        },
        remaining: function () {
          return this.tasks.filter(function(task){
            return task.completed === false
          }).length;
        }
      },
      methods: {
        // All Tasks
        getAllTasks: function(){
          const _this = this;
          $.ajax({
            url: 'tasks.json',
            success: (response) => {
              _this.tasks = response;
            }
          })
        },
        // Add a new Task
        addTask: function(event){
          const _this = this;
          $.ajax({
            url: '/tasks.json',
            method: 'POST',
            data: {
              task: { content: event.target.value }
            },
            success: (response) => {
              _this.task = [];
              _this.tasks.push(response);
            }
          });
        },
        // Update a Task
        updateTask: function(task){
          const _this = this;
          $.ajax({
            url: '/tasks/' + task.id + '.json',
            method: 'PUT',
            data: {
              task: task
            },
            success: (response) => {
              console.log(response);
            }
          });
        },
        // Delete a Task
        deleteTask: function(task){
          const _this = this;
          const index = _this.tasks.indexOf(task);
          $.ajax({
            url: '/tasks/' + task.id + '.json',
            method: 'DELETE',
            success: (response) => {
              _this.tasks.splice(index, 1);
            }
          });
        },
        all: function () {
          this.currentFilter = 'all';
        },
        activeTasks: function(){
          this.currentFilter = 'active';
        },
        completedTasks: function () {
          this.currentFilter = 'completed';
        }
      }
    })
  }
}
