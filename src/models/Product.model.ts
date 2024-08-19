import {Table, Column, Model, DataType, Default, PrimaryKey, AutoIncrement} from 'sequelize-typescript'


@Table({
    tableName: 'products'
})

class Products extends Model {

    // @Column({
    //     type: DataType.INTEGER(),
    //     primaryKey: true,
    //     autoIncrement:true
    // })
    // declare id:number

    @Column({
        type: DataType.STRING(100)
    })
    declare name:string
    
    @Column({
        type: DataType.FLOAT
    })
    declare price:number

    @Default(true)
    @Column({
        type: DataType.BOOLEAN()
    })
    declare availability: boolean 


}

export default Products