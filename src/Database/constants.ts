export const tables = [
    `Client ( 
        Pan_ID char(10) not null, 
        First_Name varchar(50) not null, 
        Last_Name varchar(50) not null, 
        Email_ID varchar(80) not null unique, 
        Password varchar(20) not null, 
        Phone_Number char(10) not null unique, 
        DOB date not null, 
        primary key (Pan_ID)
    );`,

    `Tax_Consultant (
        Employee_ID char(10) not null, 
        First_Name varchar(50) not null, 
        Last_Name varchar(50) not null, 
        Email_ID varchar(80) not null unique, 
        Password varchar(20) not null, 
        Phone_Number char(10) not null unique, 
        primary key (Employee_ID)
    );`,

    `House_Loan (
        Pan_ID char(10) not null, 
        FA_Year varchar(10) not null, 
        Bank_Name varchar(20) not null,
        Amount numeric(15) not null, 
        File_Location varchar(150) not null, 
        Intrest_rate numeric(3) not null, 
        primary key (Pan_ID, FA_Year, Bank_Name), 
        foreign key (Pan_ID) references client (Pan_ID)
    );`,

    `Income (
        Pan_ID char(10) not null, 
        FA_Year varchar(10) not null, 
        Amount numeric(15) not null, 
        File_Location varchar(150) not null, 
        Company varchar(50) not null, 
        primary key (Pan_ID, FA_Year), 
        foreign key (Pan_ID) references client (Pan_ID)
    );`,

    `PF (
        Pan_ID char(10) not null, 
        FA_Year varchar(10) not null, 
        Bank_Name varchar(20) not null, 
        Amount numeric(15) not null, 
        File_Location varchar(150) not null, 
        Intrest_rate numeric(3) not null, 
        primary key (Pan_ID, FA_Year, Bank_Name), 
        foreign key (Pan_ID) references client (Pan_ID)
    );`,

    `Donation (
        Pan_ID char(10) not null, 
        FA_Year varchar(10) not null, 
        Amount numeric(15) not null, 
        File_Location varchar(150) not null, 
        Trust_Name varchar(50) not null, 
        primary key (Pan_ID, FA_Year), 
        foreign key (Pan_ID) references client (Pan_ID)
    );`,

    `Rent (
        Pan_ID char(10) not null, 
        FA_Year varchar(10) not null, 
        Door_or_Plot_No varchar(20) not null, 
        City varchar(20) not null, 
        Amount numeric(15) not null, 
        File_Location varchar(150) not null,
        primary key (Pan_ID, FA_Year, Door_or_Plot_No, City), 
        foreign key (Pan_ID) references client (Pan_ID)
    );`,

    `Tax_Summary (
        Pan_ID char(10) not null, 
        FA_Year varchar(10) not null, 
        PDF_File_Location varchar(150) not null, 
        XML_File_Location varchar(150) not null, 
        primary key (Pan_ID, FA_Year), 
        foreign key (Pan_ID) references client (Pan_ID)
    );`,

    `Consultation (
        Pan_ID char(10) not null, 
        FA_Year varchar(10) not null, 
        Employee_ID char(10) not null, 
        Refund_Status varchar(15) not null, 
        primary key (Pan_ID, FA_Year), 
        foreign key (Pan_ID) references client(Pan_ID), 
        foreign key (Employee_ID) references Tax_Consultant(Employee_ID)
    );`,

    `Meeting (
        Meeting_ID char(10) not null, 
        Time time not null, 
        Date date not null, 
        Pan_id char(10) not null, 
        FA_Year varchar(10)not null, 
        Employee_ID char(10) not null,
        primary key (Meeting_ID), 
        foreign key (Pan_ID,FA_Year) references Consultation(Pan_ID,FA_Year)
    );`,

    `Payment (
        Payment_ID char(10) not null, 
        FA_Year varchar(10) not null, 
        Pan_ID char(10) not null, 
        primary key (Payment_ID), 
        foreign key (Pan_ID) references client(Pan_ID)
    );`
]
