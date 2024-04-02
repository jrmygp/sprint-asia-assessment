package model

import (
	"time"
)

type checklist struct {
	Title  string `json:"title"`
	Status string `json:"status"`
}

type Task struct {
	ID        int         `gorm:"primaryKey" json:"id"`
	Title     string      `json:"title"`
	Checklist []checklist `gorm:"type:json" json:"checklist"`
	CreatedAt time.Time   `json:"created_at"`
	UpdatedAt time.Time   `json:"updated_at"`
}
