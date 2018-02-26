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

    new Vue({
      el: '#todos-app',
      data: function(){
        return {
          allTasks: [],
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
      methods: {
        // All Tasks
        getAllTasks: function(){
          const _this = this;
          $.ajax({
            url: 'tasks.json',
            success: (response) => {
              _this.tasks = response;
              _this.allTasks = _this.tasks;
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
              this.tasks.push(response);
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
        deleteTask: function(task, index){
          const _this = this;
          $.ajax({
            url: '/tasks/' + task.id + '.json',
            method: 'DELETE',
            success: (response) => {
              _this.tasks.splice(index, 1);
            }
          });
        },
        all: function () {
          this.tasks = this.allTasks;
        },
        activeTasks: function(){
          this.tasks = this.allTasks.filter(function(task){
            return task.completed === false
          });
          this.currentFilter = 'active';
        },
        completedTasks: function () {
          this.tasks = this.allTasks.filter(function(task){
            return task.completed === true
          });
          this.currentFilter = 'completed';
        }
      }
    })
  }
}
