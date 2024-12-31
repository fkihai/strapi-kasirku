// @ts-nocheck
'use strict';

/**
 * cart controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::cart.cart', ({ strapi }) => ({
  async create(ctx) {
    const { user } = ctx.state; // Ambil user dari token

    // Pastikan user sudah login
    if (!user) {
      return ctx.unauthorized('Anda harus login.');
    }

    // Ambil data dari request body
    const { data } = ctx.request.body;

    if (!data || !data.product || !data.quantity) {
      return ctx.badRequest('Data tidak lengkap.');
    }

    // Buat data cart dengan relasi ke user
    const cart = await strapi.entityService.create('api::cart.cart', {
      data: {
        users_permissions_user: user.id, // Tambahkan user dari token
        product: data.product,
        quantity: data.quantity,
      },
    });

    return cart; // Kembalikan data yang dibuat
  },
}));

