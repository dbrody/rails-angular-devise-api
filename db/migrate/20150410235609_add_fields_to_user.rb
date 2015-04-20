class AddFieldsToUser < ActiveRecord::Migration
  def change
  	add_column :users, :date_of_birth, :date
  	add_column :users, :where_born, :string
  end
end
