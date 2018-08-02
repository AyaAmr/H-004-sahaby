<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddForiegnKeysToUsersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('users', function (Blueprint $table) {
            $table->integer('type_need_id')->unsigned()->nullable()->default(null);
            $table->foreign('type_need_id')
                  ->references('id')
                  ->on('type_needs')
                  ->onDelete('cascade');
            $table->integer('language_id')->unsigned()->nullable()->default(null);
            $table->foreign('language_id')
                  ->references('id')
                  ->on('languages')
                  ->onDelete('cascade');
            $table->integer('country_id')->unsigned()->nullable()->default(null);
            $table->foreign('country_id')
                  ->references('id')
                  ->on('languages')
                  ->onDelete('cascade');
            $table->string('image_name')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('users', function (Blueprint $table) {
            //
        });
    }
}
