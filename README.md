
### Service Overview

- **api-gateway/**: Central entry point for routing API requests to the appropriate backend services.
- **auth/**: Handles user registration, login, authentication, admin/superadmin management, and user profile.
- **movie_service/**: Manages movies, their details, available locations, genres, and showtimes.
- **theatre_service/**: Manages theatres, their locations, capacities, and showtimes for movies.

---

## How to Run

1. **Install dependencies**  
   Run `npm install` in each service directory (`auth`, `movie_service`, `theatre_service`, `api-gateway`).

2. **Set up environment variables**  
   Each service may require its own `.env` file (see `.env` examples in each folder).

3. **Start MongoDB**  
   You can use Docker Compose in `movie_service` or run your own MongoDB instance.

4. **Run backend services**  
   - Start each service using its `start` or `dev` script (see each `package.json`).
   - Start the API gateway (`npm run dev` or `npm start` in `api-gateway`).

5. **Access the API**  
   All requests should be routed through the API Gateway (default: `http://localhost:8000/api/...`).

---

## Future Scope

PopcornMedia will evolve into a full-featured Movie Ticket Booking system with:

- **User Registration & Authentication** (with admin/superadmin roles)
- **Location-Based Movie & Theatre Listings**
- **Showtime and Seat Selection**
- **Secure Ticket Booking and Payment Integration**
- **Booking History and Notifications**
- **Admin Panel for Content Management**
- **User Reviews and Ratings**
- **Scalable Microservices Architecture**
- **Comprehensive Testing (unit, integration, e2e)**

---

## Contributing

Contributions are welcome! Please open issues or submit pull requests for improvements and new features.

---

*PopcornMedia is under active development. Stay tuned for updates as we build a complete movie ticket