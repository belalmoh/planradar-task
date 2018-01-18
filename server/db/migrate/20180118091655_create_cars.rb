class CreateCars < ActiveRecord::Migration[5.1]
  def change
    create_table :cars do |t|
      t.column :name, :string, :limit => 30, :default => 'New Unnamed Car'
      t.column :horsepower, :integer, :default => 0
      t.column :price, :integer, :default => 0
      t.column :cartype, :string, :default => 'Van'

      t.timestamps
    end
  end
end
