class Tasks {
  static initialize(){
    // Component Todo Item
    var todoItem = Vue.component('task-item', {
      template: '#task-item',
      props: ['task']
    });

    new Vue({
      el: '#todos-app',
      data: function(){
        return {
          tasks: [],
          task: {
            content: ''
          }
        }
      },
      created: function () {
        const _this = this;
        $.ajax({
          url: 'tasks.json',
          success: (response) => {
            _this.tasks = response;
          }
        })
      },
      methods: {
        addTask: function(event){
          const _this = this;
          $.ajax({
            url: '/tasks.json',
            method: 'POST',
            data: {
              task: { content: event.target.value }
            },
            success: (response) => {
              _this.task = []
              this.tasks.push(response);
            }
          })
        }
      }
    })
  }
}
