import moment from "moment";

export const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

export const getInitials = (name) =>{
    if(!name) return "";

    const words = name.split("");
    let initials = "";

    for (let i = 0; i < words.length; i++) {
        initials += words[i].charAt(0);
    }

    return initials;
}

export const addThousandSeparator = (num) => {
    if(num==null||isNaN(num)) return "";

    const [integerPart,fractionalPart]=num.toString().split(".");
    const formattedIntegerPart = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return fractionalPart ? `${formattedIntegerPart}.${fractionalPart}` : formattedIntegerPart;
}

export const prepareExpenseBarChartData=(data=[])=>{
    const chartdata=data.map((item)=>({
        category:item?.category,
        amount:item?.amount,
    }))

    return chartdata;
}

export const prepareIncomeBarChartData=(data=[])=>{
    const sortedData=[...data].sort((a,b)=>new Date(a.date)-new Date(b.date));
    const chartdata=data.map((item)=>({
        month:moment(item?.date).format('dd mmm'),
        source:item?.source,
        amount:item?.amount,
    }));

    return chartdata;
}

export const prepareExpenseLineChartData=(data=[])=>{
    const sorteddata=[...data].sort((a,b)=>new Date(a.date)-new Date(b.date));
    const chartdata=data.map((item)=>({
        month:moment(item?.date).format('dd mmm'),
        category:item?.category,
        amount:item?.amount,
    }))

    return chartdata;
}

