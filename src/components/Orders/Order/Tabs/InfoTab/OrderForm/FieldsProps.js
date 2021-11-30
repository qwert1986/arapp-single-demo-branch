import labels from "./labels"

const FieldsProps =  {
    name: {
        label: labels.fields_names.name,
        name: "name",
        type: "text",
        placeholder: labels.fields_placeholders.name,
    },

    last_name: {
        label: labels.fields_names.last_name,
        name: "last_name", 
        type: "text",
        placeholder: labels.fields_placeholders.last_name,
    }, 

    middle_name: {
        label: labels.fields_names.middle_name,
        name: "middle_name",
        type: "text",
        placeholder: labels.fields_placeholders.middle_name,
    },

    zip_code: {
        label: labels.fields_names.zip_code,
        name: "zip_code", 
        type: "text",
        placeholder: labels.fields_placeholders.zip_code,
    },

    region: {
        label: labels.fields_names.region,
        name: "region", 
        stateName: "regions"
    },

    city: {
        label: labels.fields_names.city,
        name: "city",
        type: "text",
        placeholder: labels.fields_placeholders.city,
    },

    address_1: {
        label: labels.fields_names.address_1,
        name: "address_1", 
        type: "text",
        placeholder: labels.fields_placeholders.address_1,
    }, 

    address_2: {
        label: labels.fields_names.address_2,
        name: "address_2",
        type: "text",
        placeholder: labels.fields_placeholders.address_2,
    }, 

    birth_date: {
        label: labels.fields_names.birth_date,
        name: "birth_date", 
        type: "text",
        placeholder: labels.fields_placeholders.birth_date,
    },

    education_level: {
        label: labels.fields_names.education_level,
        name: "education_level", 
        type: "text",
        placeholder: labels.fields_placeholders.education_level,
    },

    phone: {
        label: labels.fields_names.phone,
        name: "phone",
        type: "text",
        placeholder: labels.fields_placeholders.phone,
    },

    email: {
        label: labels.fields_names.email,
        name: "email", 
        type: "text",
        placeholder: labels.fields_placeholders.email,
    },

    course: {
        label: labels.fields_names.course,
        name: "course", 
        stateName: "courses",
    },

    date_1: {
        label: labels.fields_names.date_1,
        name: "date_1", 
        type: "text",
        placeholder: labels.fields_placeholders.date_1,
    },

    date_2: {
        label: labels.fields_names.date_2,
        name: "date_2", 
        type: "text",
        placeholder: labels.fields_placeholders.date_2,
    },

    term: {
        label: labels.fields_names.term,
        name: "term", 
        type: "text",
        placeholder: labels.fields_placeholders.term,
    }, 

    duration: {
        label: labels.fields_names.duration,
        name: "duration",
        type: "text",
        placeholder: labels.fields_placeholders.duration,
    },

    duration_unit: {
        label: labels.fields_names.duration_unit,
        name: "duration_unit",
        type: "text",
        placeholder: labels.fields_placeholders.duration_unit,
    },

    course_status: {
        label: labels.fields_names.course_status,
        name: "course_status",
        stateName: "courseStatus" ,
    },

    diplom_status: {
        label: labels.fields_names.diplom_status,
        name: "diplom_status", 
        stateName: "diplomStatus",
    },
  
    track: {
        label: labels.fields_names.track,
        name: "track", 
        type: "text",
        placeholder: labels.fields_placeholders.track,
    },

    pay_method: {
        label: labels.fields_names.pay_method,
        name: "pay_method",
        stateName: "payMethod",
    },

    price: {
        label: labels.fields_names.price,
        name: "price", 
        type: "text",
        placeholder: labels.fields_placeholders.price,
    },
    
    fee: {
        label: labels.fields_names.fee,
        name: "fee",
        type: "text",
        placeholder: labels.fields_placeholders.fee,
    }, 

    price_received: {
        label: labels.fields_names.price_received,
        name: "price_received",
        type: "text",
        placeholder: labels.fields_placeholders.price_received,
    },

    price_comments: {
        label: labels.fields_names.price_comments,
        name: "price_comments", 
        type: "text",
        placeholder: labels.fields_placeholders.price_comments,
    },

    instalments: {
        label: labels.fields_names.instalments,
        name: "instalments", 
        stateName: "instalments",
    },

    instalments_payed: {
        label: labels.fields_names.instalments_payed,
        name: "instalments_payed", 
        type: "text",
        placeholder: labels.fields_placeholders.instalments_payed,    
    },

    instalments_1st_pay:{
        label: labels.fields_names.instalments_1st_pay,
        name: "instalments_1st_pay", 
        type: "text",
        placeholder: labels.fields_placeholders.instalments_1st_pay,
    },

    instalments_type: {
        label: labels.fields_names.instalments_type,
        name: "instalments_type", 
        stateName: "instalmentsType",
    }, 

    add_info: {
        label: labels.fields_names.add_info,
        name: "add_info", 
        placeholder: labels.fields_placeholders.add_info,
    }
}
                        
export default FieldsProps           