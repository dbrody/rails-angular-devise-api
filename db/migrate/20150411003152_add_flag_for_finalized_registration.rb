class AddFlagForFinalizedRegistration < ActiveRecord::Migration
  def change
  	add_column :users, :finalized_registration, :integer
  end
end
