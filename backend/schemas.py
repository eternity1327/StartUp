from datetime import datetime
from decimal import Decimal

from pydantic import BaseModel, ConfigDict, Field


class UserCreate(BaseModel):
    username: str = Field(min_length=3, max_length=50)
    password: str = Field(min_length=6)


class UserOut(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    username: str


class Token(BaseModel):
    access_token: str
    token_type: str = "bearer"


class ProductIn(BaseModel):
    name: str = Field(min_length=1, max_length=100)
    barcode: str | None = None
    price: Decimal = Field(ge=0)
    stock: int = Field(default=0, ge=0)


class ProductOut(ProductIn):
    model_config = ConfigDict(from_attributes=True)

    id: int


class SaleItemIn(BaseModel):
    product_id: int
    quantity: int = Field(gt=0)


class SaleIn(BaseModel):
    items: list[SaleItemIn] = Field(min_length=1)


class SaleItemOut(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    product_id: int
    quantity: int
    price: Decimal


class SaleOut(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    total: Decimal
    created_at: datetime
    items: list[SaleItemOut]
