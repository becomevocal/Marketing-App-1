class AddChannelIdColumns < ActiveRecord::Migration[6.0]
  def change
    change_column :channels, :bc_id, :integer, using: 'bc_id::integer'
    rename_column :channels, :bc_id, :marketing_channel_id
    add_column :channels, :storefront_channel_id, :integer
  end
end
