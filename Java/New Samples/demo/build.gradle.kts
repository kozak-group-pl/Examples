plugins {
	java
	id("org.springframework.boot") version "3.1.9"
	id("io.spring.dependency-management") version "1.1.4"
}

group = "com"
version = "0.0.1-SNAPSHOT"

java {
	sourceCompatibility = JavaVersion.VERSION_17
}

configurations {
	compileOnly {
		extendsFrom(configurations.annotationProcessor.get())
	}
}

repositories {
	mavenCentral()
}

extra["springCloudVersion"] = "2022.0.5"

dependencies {
	implementation("org.springframework.boot:spring-boot-starter-data-jpa")
	implementation("org.springframework.boot:spring-boot-starter-web")
	implementation("org.springframework.cloud:spring-cloud-starter-openfeign")
	implementation ("org.springframework.boot:spring-boot-starter-graphql")
	implementation ("io.hypersistence:hypersistence-utils-hibernate-60:3.3.2")
	implementation ("org.hibernate:hibernate-envers:6.3.1.Final")
	implementation ("org.postgresql:postgresql:42.6.0")
	implementation ("org.mapstruct:mapstruct:1.5.5.Final")
	implementation ("org.apache.commons:commons-lang3:3.13.0")
	implementation ("io.awspring.cloud:spring-cloud-aws-starter-s3:3.0.0")
	compileOnly("org.projectlombok:lombok")
	annotationProcessor("org.projectlombok:lombok")
	annotationProcessor("org.mapstruct:mapstruct-processor:1.5.5.Final")
	annotationProcessor("org.liquibase:liquibase-core")
	testImplementation("org.springframework.boot:spring-boot-starter-test")
}

dependencyManagement {
	imports {
		mavenBom("org.springframework.cloud:spring-cloud-dependencies:${property("springCloudVersion")}")
	}
}



tasks.bootBuildImage {
	builder.set("paketobuildpacks/builder-jammy-base:latest")
}
