# ECS Web Application Deployment on AWS (EC2 + ALB + Auto Scaling)

## Overview
This project demonstrates how to deploy a Node.js web application on AWS using:
- Amazon ECS (EC2 launch type)
- Application Load Balancer (ALB)
- Auto Scaling Group (ASG)
- Private networking with NAT Gateway

The application runs inside Docker containers managed by ECS and is exposed publicly through an Application Load Balancer.

---

## Architecture
The architecture follows AWS best practices:
- Public subnets for the Application Load Balancer
- Private subnets for ECS container instances
- NAT Gateway for outbound internet access
- Auto Scaling for EC2 instances
- ECS Service for task management

---

## Technologies Used
- AWS ECS (EC2 )
- Amazon EC2
- Auto Scaling Group
- Application Load Balancer
- Amazon VPC (Public & Private Subnets)
- Amazon ECR
- Docker
- Node.js (Express)
- IAM
- CloudWatch

---

## Application

The application is a simple Node.js Express server that:
- Listens on port 3000
- Serves a basic HTML UI
- Exposes a `/health` endpoint for ALB health checks

 
::: Detailed Step-by-Step Explanation (IMPORTANT)

1. Docker Image & Amazon ECR

### Container Image & CI/CD Pipeline
- The application source code is stored in a version control repository.
- AWS CodeBuild is used to automatically fetch the source code, build the Docker image, and push it to Amazon ECR.
- The build process includes:
  - Building the Docker image from the Dockerfile
  - Authenticating with Amazon ECR
  - Tagging the image
  - Pushing the image to the ECR repository
- Amazon ECS pulls the latest image from ECR during task startup.


2. Networking (VPC)

   ### VPC Design
 - A custom VPC was created with CIDR 10.0.0.0/16
  -  Public subnets:
  - Used by the Application Load Balancer
  -  Private subnets:
  - Used by ECS EC2 instances
- NAT Gateway:
  - Allows ECS instances in private subnets to access AWS APIs
 3. ECS Cluster (EC2 Capacity)
 
  ### ECS Cluster

- An ECS cluster was created using EC2 capacity.
- Capacity Providers were enabled to integrate ECS with Auto Scaling.
  
4. Launch Template

### EC2 Launch Template
The launch template includes:
- ECS-Optimized Amazon Linux 2 AMI
- IAM Role with `AmazonEC2ContainerServiceforEC2Role`
- Security Group allowing inbound traffic from ALB
- User Data to register EC2 instances to the ECS cluster:

---

#!/bin/bash
echo ECS_CLUSTER=my-ecs-cluster >> /etc/ecs/ecs.config


---

## 5. Auto Scaling Group

### Auto Scaling Group
- Auto Scaling Group launches EC2 instances using the launch template.
- Instances are placed in private subnets.
- ECS automatically registers the instances in the cluster.

6. Task Definition

### ECS Task Definition
- Network mode: `awsvpc`
- Container port: 3000
- Image: Pulled from Amazon ECR
- Logs: Sent to CloudWatch Logs

7. Target Group
  
### Target Group
- Target type: IP
- Protocol: HTTP
- Port: 3000
- Health check path: `/`

ECS dynamically registers and deregisters task IPs.

8. Application Load Balancer

### Application Load Balancer
- Deployed in public subnets
- Listener: HTTP on port 80
- Routes traffic to ECS tasks via the target group

9. ECS Service

### ECS Service
- Launch type: Capacity Provider Strategy
- Capacity Provider: EC2 Auto Scaling Group
- Desired tasks: 2
- Load balancing enabled using ALB
- ECS handles task placement and restarts automatically

10. Accessing the Application

### Access
The application is publicly accessible via the ALB DNS name:

http://<application-load-balancer-dns>
11. Scaling Behavior

### Scaling
- ECS Service Scaling: Scales the number of running tasks
- Auto Scaling Group: Scales the number of EC2 instances
- ECS Capacity Providers coordinate both layers

12. Security

### Security
- Application runs in private subnets
- Only ALB is exposed publicly
- Security Groups restrict traffic flow
- IAM roles follow least privilege principle


13. Conclusion

    This setup provides a production-ready ECS architecture with high availability, scalability, and security using AWS best practices.

   #APPLICATIONSPECIFICATION

# Color Buttons App

A simple Node.js app with **Express** that displays three buttons to change the background color of the page.

## Features

- Three buttons: **Yellow**, **Brown**, and **Red**
- Click any button to change the **background color** instantly
- Works both locally and on cloud servers (e.g., **Amazon EC2**)
- Dockerized for easy deployment

## Requirements

- Node.js >= 18
- npm >= 9
- Docker (optional, for containerized deployment)

## Installation

### Local

```bash
git clone <your-repo-url>
cd color-buttons-app
npm install
node server.js

