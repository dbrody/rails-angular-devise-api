class CreateMoments < ActiveRecord::Migration
  def change
    create_table :moments do |t|

      t.string :type
      t.integer :content_type
      t.text :content
      t.belongs_to :user, index: true

      t.timestamps
    end
  end
end
