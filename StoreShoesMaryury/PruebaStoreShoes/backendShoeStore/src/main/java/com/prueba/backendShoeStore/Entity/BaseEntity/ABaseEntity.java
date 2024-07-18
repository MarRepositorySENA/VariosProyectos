package com.prueba.backendShoeStore.Entity.BaseEntity;

import java.time.LocalDateTime;
import java.util.UUID;

import com.prueba.backendShoeStore.Entity.Enum.Status;

import jakarta.persistence.Column;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.Id;
import jakarta.persistence.MappedSuperclass;

@MappedSuperclass
public class ABaseEntity {

//nota: No debe ser long porque el mer solicita char en 36, longitud
//	@Id
//	@GeneratedValue(strategy =GenerationType.IDENTITY)

	@Id
	@Column(name = "id", length = 36, unique = true, nullable=false)
	private String id;

	@Enumerated(EnumType.STRING)
	@Column(name = "status")
	private Status status;

	@Column(name = "created_at", nullable = false)
	private LocalDateTime createdAt;

	@Column(name = "updated_at", nullable = false)
	private LocalDateTime updatedAt;

	@Column(name = "deleted_at", nullable = false)
	private LocalDateTime deletedAt;

	// Constructor
	public ABaseEntity() {
		
		this.id =UUID.randomUUID().toString();
		this.createdAt = LocalDateTime.now();
		this.updatedAt = LocalDateTime.now();
		this.deletedAt = null;
	}

	// jencapsulamiento
	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	

	public Status getStatus() {
		return status;
	}

	public void setStatus(Status status) {
		this.status = status;
	}

	public LocalDateTime getCreatedAt() {
		return createdAt;
	}

	public void setCreatedAt(LocalDateTime createdAt) {
		this.createdAt = createdAt;
	}

	public LocalDateTime getUpdatedAt() {
		return updatedAt;
	}

	public void setUpdatedAt(LocalDateTime updatedAt) {
		this.updatedAt = updatedAt;
	}

	public LocalDateTime getDeletedAt() {
		return deletedAt;
	}

	public void setDeletedAt(LocalDateTime deletedAt) {
		this.deletedAt = deletedAt;
	}

}
