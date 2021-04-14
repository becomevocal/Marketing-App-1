class CreateChannels < ActiveRecord::Migration[6.0]
  def change
    create_table :channels do |t|
      t.references :store
      t.string :bc_id
      t.string :name
      t.string :tag_id
      t.boolean :tag_installed, default: false
      t.timestamps
    end
  end
end
