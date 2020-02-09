Status: Can take a idea how project should looks like
Vision: To become well designed Type-Script backend starter project
It means:

- Production and integration oriented
- Clean architecture
- Clean coded
- Easy to become a micro-service
- Highly decoupled from libraries and external maintained code
- Highly testable
- Easy to maintain

### NodeJs Service starter project

This project is built to kick start a JS service quick.
It use features of TypeScript for following OOP & SOLID principals.

This project let you to build a service without being depend on a specific framework or library.
The main goal of the design is to keep the codebase clean and simple from day-0 of the developing.
While the number of micro-services increasing, keeping the codebase readable become important.
Moreover, integration of well coded service with CI/CD pipeline is almost out of the box.  
By following best practices of developing, running to production in the cloud environment, become fast.
It created to fast develop a service that is easy testable, loosely coupled with the infrastructure, and easy to maintain.
The implementation and extension of the project should follow the KISS principals.

The project basically structured to be a micro-service designed in "Onion" architecture.
It allow you use it as a base project for clean-architecture, DDD design, Command pattern & other modern architecture design patterns.
Each library used in the project has been wrapped and injected into the inner layer which contains the business logic.
Any part of the project can be plug out and being replaced with different implementation.
That design gives you the ability to abstract and to separate your business logic from the technical implementation that encapsulated behind interfaces.
