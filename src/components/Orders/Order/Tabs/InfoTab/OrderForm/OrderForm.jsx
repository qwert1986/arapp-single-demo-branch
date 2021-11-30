import React from "react"
import { Field, Form } from "react-final-form"
import FieldsProps from "./FieldsProps"
import { Button, Card, Col, Row, Switch } from "antd"
import { SaveOutlined } from '@ant-design/icons';
import styles from "../InfoTab.module.css"

const OrderForm = ({ renderField, renderSelect, onSubmit, initialValues }) => {
    return (
        <Form
        onSubmit={ onSubmit }

        initialValues={ initialValues }

        render={({ handleSubmit, form, submitting, pristine, values }) => (
            <>
                <div className={ styles.editModeSwitch }>
                    <Field name="edit_mode" > 
                        { props => <Switch 
                                checkedChildren="Режим редактирования" 
                                unCheckedChildren="Режим редактирования"  
                                name={ props.input.name }
                                checked={ props.input.value }
                                onChange={ props.input.onChange } 
                            /> }
                    </Field>
                </div>
                <form onSubmit={handleSubmit}>
                    <Row>
                        <Col style={{ padding: '5px' }} xs={24} sm={24} md={12} lg={12} xl={12}>
                            <Card title="ФИО" bodyStyle={{ padding: '10px' }} headStyle={{ paddingLeft: '14px' }}>
                                <p className={ styles.inputWrapper }>
                                    <Field { ...FieldsProps.last_name } component={ renderField } editMode={ values.edit_mode } />
                                </p>

                                <p className={ styles.inputWrapper }>
                                    <Field { ...FieldsProps.name } component={ renderField } editMode={ values.edit_mode } /> 
                                </p>

                                <p className={ styles.inputWrapper }>
                                    <Field { ...FieldsProps.middle_name } component={ renderField } editMode={ values.edit_mode } />
                                </p>
                            </Card>
                        </Col>
                        <Col style={{ padding: '5px' }} xs={24} sm={24} md={12} lg={12} xl={12}>
                            <Card title="Адрес" bodyStyle={{ padding: '10px' }} headStyle={{ paddingLeft: '14px' }}>
                                <p className={ styles.inputWrapper }>
                                    <Field { ...FieldsProps.zip_code } component={ renderField } editMode={ values.edit_mode } />
                                </p>

                                <div className={ styles.inputWrapper }>
                                    <Field { ...FieldsProps.region } component={ renderSelect } editMode={ values.edit_mode } />
                                </div>

                                <p className={ styles.inputWrapper }>
                                    <Field { ...FieldsProps.city } component={ renderField } editMode={ values.edit_mode } />
                                </p>

                                <p className={ styles.inputWrapper }>
                                    <Field { ...FieldsProps.address_1 } component={ renderField } editMode={ values.edit_mode } />
                                </p>

                                <p className={ styles.inputWrapper }>
                                    <Field { ...FieldsProps.address_2 } component={ renderField } editMode={ values.edit_mode } />
                                </p>
                            </Card>
                        </Col>
                        <Col style={{ padding: '5px' }} xs={24} sm={24} md={12} lg={12} xl={12}>
                            <Card title="Личные данные" bodyStyle={{ padding: '10px' }} headStyle={{ paddingLeft: '14px' }}>
                                <p className={ styles.inputWrapper }>
                                    <Field { ...FieldsProps.birth_date } component={ renderField } editMode={ values.edit_mode } />
                                </p>

                                <p className={ styles.inputWrapper }>
                                    <Field { ...FieldsProps.education_level } component={ renderField } editMode={ values.edit_mode } />
                                </p>

                                <p className={ styles.inputWrapper }>
                                    <Field { ...FieldsProps.phone } component={ renderField } editMode={ values.edit_mode } />
                                </p>

                                <p className={ styles.inputWrapper }>
                                    <Field { ...FieldsProps.email } component={ renderField } editMode={ values.edit_mode } />
                                </p>
                            </Card>
                        </Col>
                        <Col style={{ padding: '5px' }} xs={24} sm={24} md={12} lg={12} xl={12}>
                            <Card title="Курс" bodyStyle={{ padding: '10px' }} headStyle={{ paddingLeft: '14px' }}>
                                <div className={ styles.inputWrapper }>
                                    <Field { ...FieldsProps.course } component={ renderSelect } editMode={ values.edit_mode } />
                                </div>

                                <p className={ styles.inputWrapper }>
                                    <Field { ...FieldsProps.date_1 } component={ renderField }editMode={ values.edit_mode } />
                                </p>

                                <p className={ styles.inputWrapper }>
                                    <Field { ...FieldsProps.date_2 } component={ renderField } editMode={ values.edit_mode } />
                                </p>

                                <p className={ styles.inputWrapper }>
                                    <Field { ...FieldsProps.term }component={ renderField } editMode={ values.edit_mode } />
                                </p>

                                <p className={ styles.inputWrapper }>
                                    <Field { ...FieldsProps.duration } component={ renderField } editMode={ values.edit_mode } />
                                </p>

                                <p className={ styles.inputWrapper }>
                                    <Field { ...FieldsProps.duration_unit } component={ renderField } editMode={ values.edit_mode } />
                                </p>

                                <div className={ styles.inputWrapper }>
                                    <Field { ...FieldsProps.course_status } component={ renderSelect } editMode={ values.edit_mode } />
                                </div>
                            </Card>
                        </Col>
                        <Col style={{ padding: '5px' }} xs={24} sm={24} md={12} lg={12} xl={12}>
                            <Card title="Диплом" bodyStyle={{ padding: '10px' }} headStyle={{ paddingLeft: '14px' }}>
                                <div className={ styles.inputWrapper }>
                                    <Field { ...FieldsProps.diplom_status } component={ renderSelect } editMode={ values.edit_mode } />
                                </div>

                                <p className={ styles.inputWrapper }>
                                    <Field { ...FieldsProps.track } component={ renderField } editMode={ values.edit_mode } />
                                </p>   
                            </Card>
                        </Col>
                        <Col style={{ padding: '5px' }} xs={24} sm={24} md={12} lg={12} xl={12}>
                            <Card title="Оплата" bodyStyle={{ padding: '10px' }} headStyle={{ paddingLeft: '14px' }}>
                                <div className={ styles.inputWrapper }>
                                    <Field { ...FieldsProps.pay_method } component={ renderSelect } editMode={ values.edit_mode } />
                                </div>

                                <p className={ styles.inputWrapper }>
                                    <Field { ...FieldsProps.price } component={ renderField } editMode={ values.edit_mode } />
                                </p>

                                <p className={ styles.inputWrapper }>
                                    <Field { ...FieldsProps.fee } component={ renderField } editMode={ values.edit_mode } />
                                </p>

                                <p className={ styles.inputWrapper }>
                                    <Field { ...FieldsProps.price_received } component={ renderField } editMode={ values.edit_mode } />
                                </p>

                                <p className={ styles.inputWrapper }>
                                    <Field { ...FieldsProps.price_comments } component={ renderField }  editMode={ values.edit_mode } />
                                </p>

                                <div className={ styles.inputWrapper }>
                                    <Field { ...FieldsProps.instalments } component={ renderSelect } editMode={ values.edit_mode } />
                                </div>

                                <p className={ styles.inputWrapper }>
                                    <Field { ...FieldsProps.instalments_payed } component={ renderField } editMode={ values.edit_mode } />
                                </p>

                                <p className={ styles.inputWrapper }>
                                    <Field { ...FieldsProps.instalments_1st_pay } component={ renderField } editMode={ values.edit_mode } />
                                </p>

                                <div className={ styles.inputWrapper }>
                                    <Field { ...FieldsProps.instalments_type } component={ renderSelect } editMode={ values.edit_mode } />
                                </div>
                            </Card>
                        </Col>
                        <Col style={{ padding: '5px' }} xs={24} sm={24} md={12} lg={12} xl={12}>
                            <Card title="Дополнительно" bodyStyle={{ padding: '10px' }} headStyle={{ paddingLeft: '14px' }}>
                                <p className={ styles.inputWrapper }>
                                    <Field { ...FieldsProps.add_info } component={ renderField } editMode={ values.edit_mode } />    
                                </p>
                            </Card>
                        </Col>
                    </Row>
                </form>
                { 
                    values.edit_mode && 
                    <p className={ styles.editSaveButton }>
                        <Button type="primary" htmlType="submit" disabled={ submitting || pristine } shape="round" icon={ <SaveOutlined /> } size="large" >
                            Сохранить
                        </Button>
                    </p> 
                }
            </>
        )}
    />
    )
}

export default OrderForm 