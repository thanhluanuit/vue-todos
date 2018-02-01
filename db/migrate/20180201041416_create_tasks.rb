class CreateTasks < ActiveRecord::Migration[5.1]
  def change
    create_table :tasks do |t|
      t.string :content
      t.boolean :completed, default: false

      t.timestamps
    end
  end
end
