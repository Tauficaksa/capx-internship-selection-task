# CapX Internship Selection Task

This repository contains a full-stack project for managing a stock portfolio. It includes a backend built with Spring Boot and a frontend built with React (using Vite). Follow the steps below to set up and run the project.

---

## Project Structure

![image](https://github.com/user-attachments/assets/efad1d2d-cdc8-47bd-ad32-be6fb68f9474)

where **capx** folder is  backend part  
**capx-frontend** is frontend pard   
**docs** is for documentation files  


---

## Prerequisites

Before starting, ensure you have the following installed on your system:

- [Node.js](https://nodejs.org/) (for the frontend)
- [Maven](https://maven.apache.org/) (for the backend)
- A database of your choice (e.g., MySQL)
- IntelliJ IDEA or another IDE for Java development (recommended for the backend)

---

## Setting Up and Running the Frontend
1. Navigate to the Frontend Directory**  
   Open a terminal and run:
   ```bash
   cd capx-frontend
   
2. Install Dependencies
Run the following command to install the required node modules:

```bash
npm install
```
3. Set up Environment Variables
Create a .env file in the capx-frontend directory and add the following line:
```bash
VITE_FINNHUB_API_KEY='your_api_key_of_Finnhub_API'
```
4. Run the Frontend
Start the development server with the following command:
```bash
npm run dev
```
The frontend should now be accessible at http://localhost:5173.

---

## Setting Up and Running the Backend

1. Open Backend in IntelliJ IDEA
   Open the capx directory in IntelliJ IDEA or your preferred Java IDE.

2. Ensure Dependencies Are Loaded
   Open the pom.xml file. If dependencies are not loaded, click the refresh icon on the right corner to install them.

3. Create Finnhub API Key Configuration
   Navigate to capx/src/main/resources and create a new file named stock-api.properties.

   Add the following line to the file:

```properties
finnhub.api.key=your_api_key_of_Finnhub_API
```
   Replace your_api_key_of_Finnhub_API with your actual API key.

4. Configure the Database Connection
   In the same directory (capx/src/main/resources), open the application.properties file.
   Update the following lines with your database details:

```properties
spring.datasource.url=jdbc:<your_database_url> # Example: jdbc:mysql://localhost:3306/capx_stock_portfolio_db
spring.datasource.username=<your_database_username>
spring.datasource.password=<your_database_password>
```
5. Run the Backend Application
   Open capx/src/main/java/com/tauficaksa/capx/CapxApplication.java in IntelliJ IDEA.
   Right-click on the file and select Run 'CapxApplication' to start the backend server.
   The backend should now be running at http://localhost:8080.


