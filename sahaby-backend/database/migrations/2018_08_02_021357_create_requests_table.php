<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateRequestsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('requests', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('user_id')->unsigned()->nullable()->default(null);
            $table->foreign('user_id')
                  ->references('id')
                  ->on('users')
                  ->onDelete('cascade');
            $table->integer('volunteer_id')->unsigned()->nullable()->default(null);
            $table->foreign('volunteer_id')
                  ->references('id')
                  ->on('volunteers')
                  ->onDelete('cascade');
            $table->integer('type_need_id')->unsigned()->nullable()->default(null);
            $table->foreign('type_need_id')
                  ->references('id')
                  ->on('type_needs')
                  ->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('requests');
    }
}
