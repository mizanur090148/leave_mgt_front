interface InstitutionalLiabilities {
    full_name: string;
    mobile: string;
    gender: string;
    dob: string;
    nid: string;
    passport_no: string;
    email: string;
    disabilities: boolean;
    disability_details: string;
    freedom_fighter: boolean;
    freedom_fighter_details: string;

    type_of_liabilities_entry: string;
    bank_fi_name: string;
    account_no?: string;
    opening?: number;
    new_loan?: number;
    principal_paid?: number;
    invest_paid?: number;
    closing?: number;
    total_principal?: number;
    total_interest?: number;
    name_of_person?: string;
    etin_no?: string;
    name_of_loan?: string;
    type?: string;
    total_closing?: number;

}
