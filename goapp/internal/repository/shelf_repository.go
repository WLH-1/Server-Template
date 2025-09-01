package repository

import (
	"context"
	"goapp/internal/db"
	"goapp/internal/model"
	"time"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
)

type ShelfRepository interface {
	Create(ctx context.Context, shelf *model.Shelf) error
	FindAll(ctx context.Context) ([]model.Shelf, error)
	FindByID(ctx context.Context, id string) (*model.Shelf, error)
	Update(ctx context.Context, id string, update bson.M) error
	Delete(ctx context.Context, id string) error
}

type shelfRepository struct{}

func NewShelfRepository() ShelfRepository {
	return &shelfRepository{}
}

func (r *shelfRepository) collection() *mongo.Collection {
	return db.MongoClient.Database("ir").Collection("shelf")
}

func (r *shelfRepository) Create(ctx context.Context, shelf *model.Shelf) error {
	shelf.ID = primitive.NewObjectID()
	shelf.CreatedAt = time.Now()
	_, err := r.collection().InsertOne(ctx, shelf)
	return err
}

func (r *shelfRepository) FindAll(ctx context.Context) ([]model.Shelf, error) {
	cur, err := r.collection().Find(ctx, bson.M{})
	if err != nil {
		return nil, err
	}
	defer cur.Close(ctx)

	var shelfs []model.Shelf
	if err := cur.All(ctx, &shelfs); err != nil {
		return nil, err
	}
	return shelfs, nil
}

func (r *shelfRepository) FindByID(ctx context.Context, id string) (*model.Shelf, error) {
	objID, err := primitive.ObjectIDFromHex(id)
	if err != nil {
		return nil, err
	}
	var shelf model.Shelf
	err = r.collection().FindOne(ctx, bson.M{"_id": objID}).Decode(&shelf)
	if err != nil {
		return nil, err
	}
	return &shelf, nil
}

func (r *shelfRepository) Update(ctx context.Context, id string, update bson.M) error {
	objID, err := primitive.ObjectIDFromHex(id)
	if err != nil {
		return err
	}
	_, err = r.collection().UpdateByID(ctx, objID, bson.M{"$set": update})
	return err
}

func (r *shelfRepository) Delete(ctx context.Context, id string) error {
	objID, err := primitive.ObjectIDFromHex(id)
	if err != nil {
		return err
	}
	_, err = r.collection().DeleteOne(ctx, bson.M{"_id": objID})
	return err
}
